# operator()
* functional[meta header]
* std[meta namespace]
* reference_wrapper[meta class]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class... ArgTypes>
typename result_of<T&(ArgTypes&&...)>::type operator ()(ArgTypes&&... args) const; //C++11

template <class... ArgTypes>
invoke_result_t<T&, ArgTypes...> operator ()(ArgTypes&&... args) const;            //C++17

template <class... ArgTypes>
constexpr invoke_result_t<T&, ArgTypes...> operator ()(ArgTypes&&... args) const;  //C++20
```

## 概要
保持している参照に対して関数呼び出しを行う

## 要件
型`T`が関数呼び出し可能な型([*Callable*](/reference/concepts/Callable.md))であること。

C++20から、型`T`は完全型であること。

## 戻り値
[`INVOKE`](/reference/concepts/Invoke.md)`(`[`get()`](/reference/functional/reference_wrapper/get.md)`, std::`[`forward`](/reference/utility/forward.md)`<ArgTypes>(args)...)`

## 備考
`operator()`は`reference_wrapper`クラスの直接のメンバ関数とする必要は無い(たとえば、基底クラスからの継承など)。


## 例
```cpp example
#include <iostream>
#include <functional>

struct F {
  int operator()(int a, int b) const
  {
    return a + b;
  }
};

int main()
{
  F f;

  // 関数オブジェクトへの参照を保持する
  std::reference_wrapper<F> r(f);

  // 保持している関数オブジェクトを呼び出す
  int result = r(1, 2);

  std::cout << result << std::endl;
}
```
* r(1, 2)[color ff0000]

### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0357R3 reference_wrapper for incomplete types](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0357r3.html)
    - テンプレートパラメータ`T`が完全型であるという要件が追加された経緯
