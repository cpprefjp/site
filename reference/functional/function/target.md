# target
* functional[meta header]
* std[meta namespace]
* function[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class T>
T* target() noexcept;

template <class T>
const T* target() const noexcept;
```

## 概要
元となる関数を取得する。


## 要件
型`T`が、`ArgTypes...`型をパラメータにとり、`R`を戻り値の型とする関数、または関数オブジェクトであること。


## 戻り値
[`target_type()`](target_type.md) `== typeid(T)`ならば、保持している関数へのポインタを返す。そうれなければヌルポインタを返す。


## 例
```cpp
#include <iostream>
#include <functional>

struct ident_functor {
  int operator()(int x) const
  { return x; }
};

int ident_func(int x)
{ return x; }

int main()
{
  // 関数オブジェクト
  {
    std::function<int(int)> f = ident_functor();
    ident_functor* p = f.target<ident_functor>();

    if (p) {
      std::cout << (*p)(1) << std::endl;
    }
  }

  // 関数ポインタ
  {
    std::function<int(int)> f = ident_func;
    using fp_type = int(*)(int);

    fp_type* p = f.target<fp_type>();

    if (p) {
      std::cout << (*p)(1) << std::endl;
    }
  }
}
```
* target[color ff0000]

### 出力
```
1
1
```


## バージョン
### 言語
- C++11


### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照

