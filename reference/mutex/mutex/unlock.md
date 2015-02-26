#unlock (C++11)
* mutex[meta header]
* std[meta namespace]
* mutex[meta class]

```cpp
void unlock();
```

##概要
ロックを手放す


##要件
この関数を実行するスレッドがミューテックスの所有権を持っていること


##効果
この関数を呼び出したスレッドが持つミューテックスの所有権を手放す


##戻り値
なし


##例外
投げない


##例
```cpp
#include <thread>
#include <mutex>

class X {
  std::mutex mtx_;
  int value_ = 0;
public:
  // メンバ変数value_への書き込みを排他的にする
  void add_value(int value)
  {
    mtx_.lock(); // ロックを取得する
    value_ = value;
    mtx_.unlock(); // ロックを手放す
  }
};

int main()
{
  X x;

  std::thread t1([&x]{ x.add_value(1); });
  std::thread t2([&x]{ x.add_value(2); });

  t1.join();
  t2.join();
}
```
* unlock[color ff0000]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


