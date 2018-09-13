# make_shared
* memory[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class... Args>
  shared_ptr<T> make_shared(Args&&... args);
}
```

## 概要
`shared_ptr`オブジェクトを構築する。


## 戻り値
型`T`に対する `shared_ptr<T>`オブジェクトを生成し返却する。  
このとき、`args...` で受け取った引数リストを型 `T`のコンストラクタへ渡して`shared_ptr<T>`型のオブジェクトを生成する。  


## 備考
`shared_ptr<T>(new T(args...));` というように、コンストラクタを呼び出す方法でも`shared_ptr`オブジェクトを構築できる。しかしこの方法では、以下の2つのメモリ確保が必要になり、効率がよくない：

- ユーザーによるオブジェクトの生成
- 内部的な参照カウンタの生成

`make_shared()` 内部的にオブジェクトを生成するため、オブジェクトの生成と参照カウンタの生成を、1つの大きなブロックとしてメモリを確保するため、より効率的になる。

メモリの確保にユーザー定義のアロケータを使用したい場合には、 [`allocate_shared()`](allocate_shared.md) を使用する。

## 例
```cpp example
#include <memory>
#include <iostream>

int main() {
  std::shared_ptr<int> sp = std::make_shared<int>(42);
  if(sp) {
    std::cout << *sp << std::endl;
  }
}
```
* std::make_shared[color ff0000]

### 出力
```
42
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2, 3.3
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.4, 4.7.3, 4.8.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013
	- 2010〜2012 でも使用可能だが、コンパイラが可変引数テンプレートに対応していないため、最大10個の引数を受け取れる形で実装されている。


## 関連項目
- [`std::allocate_shared()`](allocate_shared.md)


## 参照
- [N2351 Improving `shared_ptr` for C++0x, Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2351.htm)
- [std::make_shared から private コンストラクタを呼び出す - 野良C++erの雑記帳](http://d.hatena.ne.jp/gintenlabo/20131211/1386771626)


