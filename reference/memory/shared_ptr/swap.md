#swap (C++11)
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]

```cpp
void swap(shared_ptr& x) noexcept;
```

##概要
他の`shared_ptr`オブジェクトとデータを入れ替える。


##効果
`*this`と`x`のデータを入れ替える。


##戻り値
なし


##例外
投げない


##例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> a(new int(3));
  std::shared_ptr<int> b(new int(1));

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
- [GCC](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 9.0 (TR1), 10.0, 11.0, 12.0
