#endl
* ostream[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& endl(basic_ostream<CharT, Traits>& os);
}
```

##概要
改行を出力し、バッファをフラッシュする。

C++のストリームには行バッファリングの機能がないため、行バッファリングの模倣として`endl`が多用される。

##効果
1. `os.`[`put`](basic_ostream/put.md)`(os.`[`widen`](../ios/basic_ios/widen.md.nolink)`('\n'))`を呼び出す。
1. `os.`[`flush`](basic_ostream/flush.md`()`を呼び出す。

##戻り値
`os`

##例
```cpp
#include <iostream>

int main() {
  std::cout << "Kamaboko" << std::endl;
}
```
* iostream[link ../iostream.md]
* cout[link ../iostream/cout.md]
* endl[color ff0000]

###出力
```
Kamaboko
```

##実装例
```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& endl(basic_ostream<CharT, Traits>& os) {
    return os.put(os.widen('\n')).flush();
  }
}
```
* basic_ostream[link basic_ostream.md]
* put[link basic_ostream/put.md]
* flush[link basic_ostream/flush.md]
* widen[link ../ios/basic_ios/widen.md.nolink]

##バージョン
###言語
- C++98

##参照
- [flush](flush.md)
