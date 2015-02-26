#hardware_concurrency (C++11)
* thread[meta header]

```cpp
static unsigned int hardware_concurrency() noexcept;
```

##概要
処理系によりサポートされるスレッド並行数を取得する。


##戻り値
サポートされるスレッド並行数。その処理系において値を取得できない場合は0を返す。


##例外
送出しない。


##備考
戻り値はヒントとしてのみ利用すべきである。（値0が取得される場合がある。）


##例
```cpp
#include <iostream>
#include <thread>

int main()
{
  std::cout << "concurrency=" << std::thread::hardware_concurrency() << std::endl;
  return 0;
}
```
* hardware_concurrency[color ff0000]

###出力例
```
concurrency=4
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [GCC, C++0x mode](/implementation.md#gcc): 4.6.3, 4.7.0
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp):

##参照

