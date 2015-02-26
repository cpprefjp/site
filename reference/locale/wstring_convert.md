#wstring_convert (C++11)
* locale[meta header]
* std[meta namespace]

```cpp
namespace std {
  template <class Codecvt, class Elem = wchar_t,
            class Wide_alloc = std::allocator<Elem>,
            class Byte_alloc = std::allocator<char> >
  class wstring_convert;
}
```
* allocator[link /reference/memory/allocator.md]

##概要
(ここに、クラスの概要を記載する)

###メンバ関数

| | |
|----------------------------|--------------------------------------------------|
| `(constructor)` | コンストラクタ |
| `(destructor)` | デストラクタ |
| `from_bytes` | バイト列からワイド文字列への変換 |
| `to_bytes` | ワイド文字列からバイト列への変換 |
| `converted` | 変換した数を取得する |
| `state` | 変換の状態を取得する |

###メンバ型

| | |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `byte_string` | バイト列型 `std::`[`basic_string`](/reference/string/basic_string.md)`<char, `[`char_traits`](/reference/string/char_traits.md)`<char>, Byte_alloc>` |
| `wide_string` | ワイド文字列型 `std::`[`basic_string`](/reference/string/basic_string.md)`<Elem, `[`char_traits`](/reference/string/char_traits.md)`<Elem>, Wide_alloc>` |
| `state_type` | ストリームのマルチバイト文字の変換の状態を表す型 `Codecvt::state_type` |
| `int_type` | 文字に対応する値を表す数値型 `wide_string::traits_type::int_type` |

###例
```cpp
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc):
- [GCC, C++0x mode](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0

###参照

