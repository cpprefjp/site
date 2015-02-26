#operator<<
* bitset[meta header]
* std[meta namespace]
* bitset[meta class]

```cpp
namespace std {
  template <class CharT, class Traits, size_t N>
  basic_ostream<CharT, Traits>&
    operator<<(basic_ostream<CharT, Traits>& os, const bitset<N>& x);
}
```
* basic_ostream[link /reference/ostream/basic_ostream.md]

##概要
2進数表記でストリームに出力する。


##戻り値

```cpp
os << x.template to_string<CharT, Traits, allocator<CharT>>(
        use_facet<ctype<CharT>>(os.getloc()).widen('0'),
        use_facet<ctype<CharT>>(os.getloc()).widen('1'));
```
* to_string[link ./to_string.md]
* allocator[link /reference/memory/allocator.md]
* use_facet[link /reference/locale/use_facet.md.nolink]
* ctype[link /reference/locale/ctype.md]
* getloc[link /reference/ios/ios_base/getloc.md.nolink]
* widen[link /reference/locale/ctype/widen.md.nolink]


##例
```cpp
#include <iostream>
#include <bitset>

int main()
{
  std::bitset<4> bs(10uL);

  std::cout << bs << std::endl;
}
```

###出力
```
1010
```


##参照

