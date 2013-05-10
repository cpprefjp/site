#valid
```cpp
bool valid() const noexcept;
```

##概要
共有状態を持っているか確認する


##戻り値
`*this`が共有状態を持っていれば`true`を返し、そうでなければ`false`を返す。


##例外
投げない


##例
```cpp
#include <iostream>
#include <future>

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  p.set_value(1);

  // 共有状態を持っている
  std::cout << std::boolalpha << f.valid() << std::endl;

  f.get(); // 一度値を取り出すと共有状態が破棄される

  std::cout << std::boolalpha << f.valid() << std::endl;
}
```
* valid[color ff0000]

###出力
```
true
false
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


