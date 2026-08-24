# target
* functional[meta header]
* std[meta namespace]
* function[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class T>
T* target() noexcept;

template <class T>
const T* target() const noexcept;
```

## 概要
元となる関数を取得する。


## 戻り値
[`target_type()`](target_type.md) `== typeid(T)`ならば、保持している関数へのポインタを返す。そうでなければヌルポインタを返す。


## 備考
- C++14までは、型`T`が「`ArgTypes...`型をパラメータにとり`R`を戻り値の型とする関数、または関数オブジェクトであること」が要件とされており、それ以外の型を指定した場合の動作は未定義であった。C++17でこの要件は削除され、`T`が呼び出し可能な型であるかどうかによらず、[`target_type()`](target_type.md) `!= typeid(T)`であればヌルポインタを返すことが保証される。


## 例
```cpp example
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
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2591. `std::function`'s member template `target()` should not lead to undefined behaviour](https://cplusplus.github.io/LWG/issue2591)
    - `T`が呼び出し可能型であることの事前条件が削除され、`target_type() != typeid(T)`のとき`T`の呼び出し可能性によらずヌルポインタを返す、広い契約の関数となった
    - この修正は欠陥報告(DR)であり、C++11以降に遡及して適用される。元は事前条件違反として未定義動作だった領域の明文化であり、処理系は当初からヌルポインタを返していたため
