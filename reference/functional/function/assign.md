#assign (C++11)
* functional[meta header]
* std[meta namespace]
* function[meta class]

```cpp
template <class F, class Alloc>
void assign(F&& f, const Alloc& alloc);
```

##概要
関数オブジェクトとアロケータを再代入する。


##効果
[`function`](./op_constructor.md)`(`[`allocator_arg`](/reference/memory/allocator_arg_t.md)`, a,` [`std::forward`](/reference/utility/forward.md)`<F>(f)).`[`swap`](./swap.md)`(*this)`


##戻り値
なし


##例
```cpp
#include <iostream>
#include <functional>

int ident(int x) { return x; }

int main()
{
  std::function<int(int)> f;
  
  // 関数とアロケータを代入。
  //
  // ※ここではint型を対象とするアロケータを渡しているが、
  // 内部で適切な関数の型にrebindして使われる。
  f.assign(ident, std::allocator<int>());

  int result = f(1);
  std::cout << result << std::endl;
}
```

###出力
```
1
```


##バージョン
###言語
- C++11


###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): (4.8.2時点で実装していない)
- [Visual C++](/implementation.md#visual_cpp): ??


##参照

