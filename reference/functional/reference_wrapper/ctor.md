#コンストラクタ(C++11)
```cpp
reference_wrapper(T& t) noexcept;
reference_wrapper(T&&) = delete;
reference_wrapper(const reference_wrapper<T>& x) noexcept;
```

##概要
与えられた参照で、参照オブジェクトを構築する。

##各オーバーロードの詳細
- `reference_wrapper(T& t) noexcept;`<br/>`t`への参照を保持する`reference_wrapper`オブジェクトを構築する
- `reference_wrapper(const reference_wrapper<T>& x) noexcept;`<br/>`x.`[`get()`](/reference/functional/reference_wrapper/get.md)への参照を保持する`reference_wrapper`オブジェクトを構築する



##例
```cpp
#include <iostream>
#include <functional>

int main()
{
  int x = 3;

  // xへの参照を保持する
  std::reference_wrapper<int> r(x);
  r.get() += 1;
  std::cout << x << std::endl;

  // 参照ラッパーrが指すxへの参照を保持する
  std::reference_wrapper<int> r2(r);
  r.get() += 1;
  std::cout << x << std::endl;
}
```

###出力
```
4
5
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


