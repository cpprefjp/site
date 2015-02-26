#unlock_shared (C++14)
* shared_mutex[meta header]

```cpp
void unlock_shared();
```

##概要
共有ロックを手放す。


##要件
この関数を実行するスレッドがミューテックスの共有所有権を持っていること。


##効果
この関数を呼び出したスレッドが持つミューテックスの共有所有権を手放す。


##戻り値
なし


##例外
投げない


##例
```cpp
#include <thread>
#include <shared_mutex>

class X {
  mutable std::shared_timed_mutex mtx_;
  int value_ = 0;
public:
  // メンバ変数value_への書き込みを排他的にする
  void add_value(int value)
  {
    mtx_.lock(); // 排他ロックを取得する
    value_ = value;
    mtx_.unlock(); // 排他ロックを手放す
  }

  // メンバ変数value_の値を読み込む
  int get_value() const
  {
    int result = 0;
    mtx_.lock_shared(); // 共有ロックを取得する
	result = value_;
	mtx_.unlock_shared(); // 共有ロックを手放す
	return result;
  }
};

int main()
{
  X x;

  std::thread t1([&x]{ x.add_value(1); int value = x.get_value(); });
  std::thread t2([&x]{ x.add_value(2); int value = x.get_value(); });

  t1.join();
  t2.join();
}
```
* unlock_shared()[color ff0000]
* lock()[link ./lock.md]
* unlock()[link ./unlock.md]
* lock_shared()[link ./lock_shared.md]
* std::thread[link /reference/thread/thread.md]
* join()[link /reference/thread/thread/join.md]

###出力
```
```

##バージョン
###言語
- C++14

###処理系
- [Clang, C++14 mode](/implementation.md#clang): 3.5
- [GCC, C++14 mode](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


