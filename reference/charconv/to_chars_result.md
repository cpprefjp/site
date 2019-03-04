# to_chars_result
* charconv[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std {
  struct to_chars_result {
    char* ptr;
    error_code ec;
  };
}
```

## 概要
[`to_chars`](../charconv/to_chars.md)の戻り値となる変換の成否と追加情報を表現するクラス。

## メンバ変数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| ptr | 成功した場合、書き込まれた最後の文字の次の位置を指すポインタ。 | C++17 |
| ec | `bool(ec) == false`なら成功、`bool(ec) == true`なら失敗を表す[`error_code`](/reference/system_error/error_code.md)。 | C++17 |

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 update 7

## 関連項目
- [`to_chars`](../charconv/to_chars.md)


## 参照
- [P0067R5: Elementary string conversions, revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r5.html)
