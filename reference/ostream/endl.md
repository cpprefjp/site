# endl
* ostream[meta header]
* std[meta namespace]
* function template[meta id-type]

```cpp
namespace std {
  template<class CharT, class Traits>
  basic_ostream<CharT, Traits>& endl(basic_ostream<CharT, Traits>& os);
}
```
* basic_ostream[link basic_ostream.md]

## 概要
改行を出力し、バッファをフラッシュする。

C++のストリームには行バッファリングの機能がないため、行バッファリングの模倣として`endl`が多用される。

## 効果
1. `os.`[`put`](basic_ostream/put.md)`(os.`[`widen`](../ios/basic_ios/widen.md)`('\n'))`を呼び出す。
1. `os.`[`flush`](basic_ostream/flush.md)`()`を呼び出す。

## 戻り値
`os`

## 備考
本関数は、直接呼ぶのではなく、マニピュレータ関数へのポインタを引数に取る出力演算�（[`operator<<`](basic_ostream/op_ostream.md)、挿入演算�、インサータとも呼ばれる）を通じて呼び出されるのが一般的である。

## 例
```cpp example
#include <iostream>

int main() {
  std::cout << "Kamaboko";
  std::endl(std::cout);                 // 直接呼出し（あまり一般的では無い）
  std::cout << "cpprefjp" << std::endl; // operator<< を通じた間接的な呼び出し（より一般的）
}
```
* std::endl[color ff0000]

### 出力
```
Kamaboko
```

## 実装例
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
* widen[link ../ios/basic_ios/widen.md]

## バージョン
### 言語
- C++98

## 参照
- [flush](flush.md)
