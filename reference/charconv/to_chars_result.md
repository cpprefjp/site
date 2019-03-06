# to_chars_result
* charconv[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std {
  struct to_chars_result {
    char* ptr;
    errc ec;
  };
}
```

## 概要
[`to_chars`](../charconv/to_chars.md)の戻り値となる変換の成否と追加情報を表現するクラス。

## メンバ変数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| ptr | 成功した場合、書き込まれた最後の文字の次の位置を指すポインタ。 | C++17 |
| ec | 成功なら`ec == errc{}`、失敗ならば`errc::value_too_large`を表す[`errc`](/reference/system_error/errc.md)の値。 | C++17 |

詳細は[`to_chars`](../charconv/to_chars.md)の戻り値の項を参照のこと。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0
- [GCC](/implementation.md#gcc): 8.0
- [Visual C++](/implementation.md#visual_cpp): 2017 update 7

## 関連項目
- [`to_chars`](../charconv/to_chars.md)


## 参照
- [P0067R5: Elementary string conversions, revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r5.html)
- [P0682R1: Repairing elementary string conversions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0682r1.html)
