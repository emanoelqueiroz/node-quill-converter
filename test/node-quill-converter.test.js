const {
  convertTextToDelta,
  convertHtmlToDelta,
  convertDeltaToHtml } = require('../lib/index.js');

describe('node-quill-converter', () => {
  it('convertTextToDelta', () => {
    let text = 'hello, world';
    let deltaExpected = { ops: [{ insert: 'hello, world\n' }] };

    let deltaResult = convertTextToDelta(text);

    expect(deltaResult).toEqual(deltaExpected);
  });

  it('convertHtmlToDelta', async () => {
    const html = `<ol><li>asdad</li><li>asdad</li><li>asdasd</li></ol>`;
    const deltaExpected = {
      "ops": [
        {
          "insert": "asdad"
        },
        {
          "attributes": {
            "list": "ordered"
          },
          "insert": "\n"
        },
        {
          "insert": "asdad"
        },
        {
          "attributes": {
            "list": "ordered"
          },
          "insert": "\n"
        },
        {
          "insert": "asdasd"
        },
        {
          "attributes": {
            "list": "ordered"
          },
          "insert": "\n"
        }
      ]
    };

    const deltaResult = await convertHtmlToDelta(html);

    expect(deltaResult).toEqual(deltaExpected);
  });

  it('convertHtmlToDelta', () => {
    let delta = {
      ops: [
        {
          insert: "hello, "
        },
        {
          insert: "world",
          attributes: {
            bold: true
          }
        }
      ]
    };

    let htmlExpected = `<p>hello, <strong>world</strong></p>`;
    let htmlResult = convertDeltaToHtml(delta);

    expect(htmlResult).toEqual(htmlExpected);
  });

  it('GitHub Issue #2', () => {
    let issueDeltaJSON = "{\"ops\":[{\"insert\":\"first\"},{\"attributes\":{\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"second\"},{\"attributes\":{\"list\":\"ordered\"},\"insert\":\"\\n\"},{\"insert\":\"next level\"},{\"attributes\":{\"indent\":1,\"list\":\"ordered\"},\"insert\":\"\\n\"}]}"
    let delta = JSON.parse(issueDeltaJSON);

    let htmlExpected = "<ol><li>first</li><li>second</li><li class=\"ql-indent-1\">next level</li></ol>";
    let htmlResult = convertDeltaToHtml(delta);

    expect(htmlResult).toEqual(htmlExpected);
  });
});
