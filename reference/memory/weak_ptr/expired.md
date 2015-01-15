#expired (C++11)
```cpp
bool expired() const noexcept;
```

##概要
監視している`shared_ptr`オブジェクトの寿命が切れたかを判定する。


##戻り値
```cpp
use_count() == 0
```
* use_count()[link ./use_count.md]


##備考
この関数は、実際には[`use_count()`](./use_count.md) `== 0`で判定するよりも、高速に実装される可能性がある。


##例
```cpp
#include <cassert>
#include <memory>

int main()
{
  std::weak_ptr<int> wp;
  {
    std::shared_ptr<int> sp(new int(3));

    // shared_ptrオブジェクトspを監視する
    wp = sp;

    // shared_ptrオブジェクトの寿命は切れていない
    assert(!wp.expired());
  }

  // shared_ptrオブジェクトの寿命が切れた
  assert(wp.expired());
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [GCC, C++11 mode](/implementation.md#gcc): 4.3.6
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?
