#swap (C++11)
* future[meta header]
* std[meta namespace]

```cpp
void swap(promise& other) noexcept;
```

##概要
他の`promise`オブジェクトと値を入れ替える


##効果
`*this`と`other`の共有状態を入れ替える


##事後条件
`*this`はこの関数呼び出し前の`other`の共有状態を持ち、`other`はこの関数呼び出し前の`*this`の共有状態を持つこと。


##戻り値
なし


##例外
投げない


##例
```cpp
#include <iostream>
#include <future>

int main()
{
  std::promise<int> p1;
  std::promise<int> p2;

  std::future<int> f1 = p1.get_future();
  std::future<int> f2 = p2.get_future();

  // 共有状態を入れ替える
  p1.swap(p2);

  p1.set_value(1);
  p2.set_value(2);

  // p1に書き込んだ値はf2、
  // p2に書き込んだ値はf1から取得される
  std::cout << f1.get() << std::endl;
  std::cout << f2.get() << std::endl;
}
```
* swap[color ff0000]

###出力
```
2
1
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0


##参照


