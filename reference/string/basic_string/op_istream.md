#operator>>
* string[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  template <class CharT, class Traits, class Allocator>
  basic_istream<CharT, Traits>&
    operator>>(basic_istream<CharT, Traits>& is,
               basic_string<CharT, Traits, Allocator>& str);
}
```

##概要
文字列をストリームから入力する。空白文字が現れるまで、あるいは`setw`マニピュレータで指定された数までの文字列を入力する。

この関数は、書式化入力関数（[`basic_istream`](../../istream/basic_istream.md)を参照）として作用する。

## 効果
1. [`basic_istream<>::sentry`](../../istream/basic_istream/sentry.md)オブジェクトを構築する。`sentry`オブジェクトが失敗を示した場合、何もしない。
1. `str.erase()`を呼び出す。
1. 以下のいずれかを満たすまで、文字を入力して`str.append(1, c)`と等価な方法で文字列に追加する。なお、`c`は入力した文字を表す。
    - 最大文字数まで書き込んだ。最大文字数は次のいずれかである。
        - `is.width()`が`0`以上ならその値とする。
        - さもなくば、`str.max_size()`とする。
    - EOFに達した。
    - 空白文字に達した。空白文字の判定にはストリームに設定されているロケールが考慮される。
1. `is.width(0)`を呼び出す。

`str`に1文字も入力が行われなかった場合、`is.setstate(ios_base::failbit)`が呼び出される。

##戻り値
- 仮引数`is`。


##例
```cpp
#include <iostream>
#include <string>

int main() {
  std::string a, b;
  if (std::cin >> a >> b) {
    std::cout << a << std::endl;
    std::cout << b << std::endl;
  }
}
```
* std::cin[link /reference/iostream/cin.md]

###入力
```
Apple Banana
```

###出力
```
Apple
Banana
```

##参照
- [`getline`](getline.md): このほかの`basic_string`に対する入力関数。
- このほかの`>>`演算子関数
    - [`<istream>`ヘッダで定義されているもの](../../istream/basic_istream/op_istream.md)
