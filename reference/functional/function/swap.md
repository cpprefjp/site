#swap (C++11)
* functional[meta header]
* std[meta namespace]
* function[meta class]

```cpp
void swap(function& other) noexcept;
```

##概要
他の`function`オブジェクトと中身を入れ替える。


##効果
`*this`が持つ関数と`other`が持つ関数を交換する。


##戻り値
なし


##例外
投げない


##例
```cpp
#include <iostream>
#include <functional>

int ident(int x) { return x; }
int add(int x) { return x + 1; }

int main()
{
  std::function<int(int)> f = ident;
  std::function<int(int)> g = add;

  // fとgを交換
  f.swap(g);

  std::cout << f(1) << std::endl; // add
  std::cout << g(1) << std::endl; // ident
}
```

###出力
```
2
1
```


##バージョン
###言語
- C++11


###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): ??


##参照

