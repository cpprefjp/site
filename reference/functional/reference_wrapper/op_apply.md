#関数呼び出し演算子(C++11)
```cpp
template <class... ArgTypes>
typename result_of<T&(ArgTypes&&...)>::type operator ()(ArgTypes&&... args) const;
```

##概要
保持している参照に対して関数呼び出しを行う


##要件
型`T`が関数呼び出し可能な型([`Callable`](/reference/functional/callable.md))であること


##戻り値
[`INVOKE`](/reference/functional/invoke.md)`(`[`get()`](/reference/functional/reference_wrapper/get.md)`, std::`[`forward`](/reference/utility/forward.md)`<ArgTypes>(args)...)`

##備考
`operator()`は`reference_wrapper`クラスの直接のメンバ関数とする必要は無い(たとえば、基底クラスからの継承など)。


##例
```cpp
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

###出力
```
3
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??


##参照


