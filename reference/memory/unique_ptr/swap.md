#swap (C++11)
```cpp
void swap(unique_ptr& x) noexcept;
```

##概要
他の`unique_ptr`オブジェクトとデータを入れ替える。


##要件
デリータ`D`が、例外を投げないという保証のもとに`swap`可能であること。


##効果
`*this`と`x`が保持する、ポインタとデリータオブジェクトそれぞれに対して、`swap()`関数を実行する。


##戻り値
なし


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> a(new int(3));
  std::unique_ptr<int> b(new int(1));

  // aとbを入れ替える
  a.swap(b);

  std::cout << *a << std::endl;
  std::cout << *b << std::endl;
}
```

###出力
```
1
3
```

##バージョン
###言語
- C++11

###処理系
- [GCC](/implementation#gcc.md): 4.4.7
- [Clang libc++, C++11 mode](/implementation#clang.md): 3.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?
