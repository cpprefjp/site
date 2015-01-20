#try_lock (C++11)
```cpp
bool try_lock();
```

##概要
ロックの取得を試みる


##要件
この関数を呼び出したスレッドが、ミューテックスの所有権を保持していないこと


##効果
ブロッキングせずにこの関数を呼び出したスレッドがミューテックスの所有権を取得する


##戻り値
所有権が取得できなかった場合は何もせずに関数が`false`で返り、所有権を取得できた場合は`true`を返す。


##例外
投げない


##備考
この関数の実装が、ミューテックスの所有権を保持しているスレッドがひとつもない場合でも、所有権の取得に失敗する可能性がある。


##例
```cpp
#include <thread>
#include <mutex>
#include <system_error>

class X {
  std::mutex mtx_;
  int value_ = 0;
public:
  // メンバ変数value_への書き込みを排他的にする
  void add_value(int value)
  {
    if (!mtx_.try_lock()) {
      // ロックの取得に失敗
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }
    value_ = value;
    mtx_.unlock();
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
* try_lock[color ff0000]


###出力例
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


