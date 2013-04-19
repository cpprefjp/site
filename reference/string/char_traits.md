#char_traits
```cpp
namespace std {
  template<class charT> struct char_traits;

  template<> struct char_traits<char>;
  template<> struct char_traits<char16_t>; // C++11から
  template<> struct char_traits<char32_t>; // C++11から
  template<> struct char_traits<wchar_t>;
}
```

##概要

(ここに、クラスの概要を記載する)

###静的メンバ関数

| | |
|---------------------------|-------------------------------------------------------------------------|
| `assign` | 代入 |
| `eq` | 等値比較 |
| `lt` | 小なり比較 |
| `compare` | 比較 |
| `length` | 文字列長を取得する |
| `move` | 文字列を他のシーケンスにコピーする |
| `copy` | 文字列を他のシーケンスにコピーする。 |
| `not_eof` | 文字がファイル終端文字(EOF)じゃないかをテストする |
| `to_char_type` | 数値を文字に変換する |
| `to_int_type` | 文字を数値に変換する |
| `eq_int_type` | 数値の等値比較 |
| `eof` | ファイル終端文字(EOF)を表す数値を取得する |

###メンバ型

| | |
|-------------------------|--------------------------------------------------------------------------|
| `char_type` | 文字コンテナの実装で使用される文字型 |
| `int_type` | 文字に対応する値を表す数値型 |
| `off_type` | 文字の差を表す型 |
| `pos_type` | 位置を表す型 |
| `state_type` | ストリームのマルチバイト文字の変換の状態を表す型 |

<b>charによる特殊化のメンバ型定義</b>

| | |
|------------------------------------------------------------------------|------------------------|
| char_type | `char` |
| int_type | `int` |
| off_type | `streamoff` |
| pos_type | `streampos` |
| state_type | `mbstate_t` |

<b>char16_tによる特殊化のメンバ型定義(C++11)</b>

| | |
|------------------------------------------------------------------------|-----------------------------|
| char_type | `char16_t` |
| int_type | `uint_least16_t` |
| off_type | `streamoff` |
| pos_type | `u16streampos` |
| state_type | `mbstate_t` |


<b>char32_tによる特殊化のメンバ型定義(C++11)</b>

| | |
|------------------------------------------------------------------------|-----------------------------|
| char_type | `char32_t` |
| int_type | `uint_least32_t` |
| off_type | `streamoff` |
| pos_type | `u32streampos` |
| state_type | `mbstate_t` |


<b>wchar_tによる特殊化のメンバ型定義</b>

| | |
|------------------------------------------------------------------------|-------------------------|
| char_type | `wchar_t` |
| int_type | `wint_t` |
| off_type | `streamoff` |
| pos_type | `wstreampos` |
| state_type | `mbstate_t` |



##例
```cpp
```

###出力
```cpp
###参照
```
