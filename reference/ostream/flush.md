#flush
* ostream[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& flush(basic_ostream<CharT, Traits>& os);
}
```

##概要
バッファをフラッシュする。

##効果
1. `os.`[`flush`](basic_ostream/flush.md)`()`を呼び出す。

##戻り値
`os`

##備考
本関数は、直接呼ぶのではなく、マニピュレータ関数へのポインタを引数に取る出力演算子（[`operator<<`](basic_ostream/op_ostream.md)、挿入演算子、インサータとも呼ばれる）を通じて呼び出されるのが一般的である。

##例
```cpp
#include <iostream>

int main() {
  std::cout << "Hello world\n";
  std::flush(std::cout);                          // 直接呼出し（あまり一般的では無い）
  std::cout << "Hello cpprefjp\n" << std::flush;  // operator<< を通じた間接的な呼び出し（より一般的）
}
```
* std::flush[color ff0000]

###出力
```
Hello world
Hello cpprefjp
```

##実装例
```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& flush(basic_ostream<CharT, Traits>& os) {
    return os.flush();
  }
}
```
* basic_ostream[link basic_ostream.md]

##バージョン
###言語
- C++98

##参照
- [endl](endl.md)
