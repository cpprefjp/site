# wbuffer_convert
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Codecvt,
            class Elem = wchar_t,
            class Tr = std::char_traits<Elem> >
  class wbuffer_convert : public std::basic_streambuf<Elem, Tr>;
}
```
* char_traits[link /reference/string/char_traits.md]
* basic_streambuf[link ../streambuf/basic_streambuf.md]

## 概要
(ここに、クラスの概要を記載する)

### メンバ関数

| 名前 | 説明 |
|----------------------------|--------------------------------------------------|
| `(constructor)` | コンストラクタ |
| `rdbuf` | ストリームバッファのリダイレクト |
| `state` | 変換の状態を取得する |

### メンバ型

| 名前 | 説明 |
|-------------------------|------------------------------------------------------------------------------------------------------------|
| `state_type` | ストリームのマルチバイト文字の変換の状態を表す型 `Codecvt::state_type` |

### 例
```cpp
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc):
- [GCC, C++11 mode](/implementation.md#gcc):
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013


## 参照
- [N2007 Proposed Library Additions for Code Conversion](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2007.html)

