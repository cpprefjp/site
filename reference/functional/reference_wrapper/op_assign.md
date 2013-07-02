#代入演算子(C++11)
```cpp
reference_wrapper& operator=(const reference_wrapper<T>& x) noexcept;
```

##概要
参照先を切り替える

##効果
`*this`が`x.get()`を指すように更新する


##戻り値
`*this`


##例
```cpp
#include <iostream>
#include <functional>

int main()
{
  int x = 3;
  int y = 5;

  // xへの参照を保持する
  std::reference_wrapper<int> r(x);
  r = std::ref(y); // yへの参照を保持するよう切り替える

  r.get() += 1;

  std::cout << x << std::endl;
  std::cout << y << std::endl;
}
```

###出力
```
36
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


