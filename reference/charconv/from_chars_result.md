# from_chars_result
* charconv[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std {
  struct from_chars_result {
    const char* ptr;
    error_code ec;
  };
}
```

## 概要
[`from_chars`](../charconv/from_chars.md)の戻り値となる変換の成否と追加情報を表現するクラス。

## メンバ変数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| ptr | （指定したフォーマットの）パターンにマッチしない最初の入力文字の位置を指すか、入力文字列の先頭を指すポインタ。 | C++17 |
| ec | `bool(ec) == false`なら成功、`bool(ec) == true`なら失敗を表す[`error_code`](/reference/system_error/error_code.md)。 | C++17 |

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 update 7

## 関連項目
- [`from_chars`](../charconv/from_chars.md)


## 参照
- [P0067R5: Elementary string conversions, revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r5.html)
