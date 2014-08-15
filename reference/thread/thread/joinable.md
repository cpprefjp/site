#joinable (C++11)
```cpp
bool joinable() const noexcept;
```

##概要
`thread`オブジェクトがスレッドと関連付けられているか否か取得する。


##戻り値
スレッドと関連付けられているなら`true`を、そうでなければ`false`を返す。


##例外
送出しない。


##例
```cpp
#include <cassert>
#include <thread>

int main()
{
  std::thread thd([]{ /*...*/ });
  assert(thd.joinable());

  thd.join();
  assert(!thd.joinable());
  return 0;
}
```
* joinable[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.3, 4.7.0
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp)

##参照
