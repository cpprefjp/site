#codecvt_utf8_utf16
* codecvt[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class Elem, unsigned long Maxcode = 0x10ffff,
            codecvt_mode Mode = (codecvt_mode)0>
  class codecvt_utf8_utf16 : public codecvt<Elem, char, mbstate_t> {
    // 未規定...
  };
}
```
* codecvt_mode[link /reference/codecvt/codecvt_mode.md]
* codecvt[link /reference/locale/codecvt.md]

##概要
(ここに、クラスの概要を記載する)

##例
```cpp
```

###出力
```
```

##バージョン

###言語
- C++11:

##参照
- [N2401 Code Conversion Facets for the Standard C++ Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2401.htm)

