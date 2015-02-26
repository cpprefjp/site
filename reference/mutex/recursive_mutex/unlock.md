#unlock (C++11)
* mutex[meta header]
* std[meta namespace]

```cpp
void unlock();
```

##概要
ロックを手放す


##要件
この関数を実行するスレッドがミューテックスの所有権を持っていること。


##効果
この関数を呼び出したスレッドが持つミューテックスの所有権カウントを1減らす。 
unlockにより所有権カウントが0になったとき、ミューテックスの所有権を手放す。


##戻り値
なし


##例外
投げない


##備考
あるミューテックスに対するunlockの回数は、ロック取得に成功した回数（lockおよびtrueを返したtry_lockの回数）と正確に同一でなければならない。


##例
```cpp
#include <iostream>
#include <mutex>
#include <thread>

class counter {
  int count_ = 0;
  std::recursive_mutex mtx_;

public:
  int add(int value)
  {
    mtx_.lock(); // 2.ロックを再帰的に取得する(所有権カウントが2になる)
    int result = count_ += value;
    mtx_.unlock(); // 3.ロックを手放す(まだ所有権カウントが0より大きいため所有権を手放さない)

    return result;
  }

  int increment()
  {
    mtx_.lock(); // 1.ロックを取得する(所有権カウントが1になる)
    int result = add(1); // add()関数内でも同じミューテックスからロックを取得する
    mtx_.unlock(); // 4.ロックを手放す(所有権カウントが0になるので、所有権を手放す)

    return result;
  }
};

std::mutex print_mtx_;
void print_value(int value)
{
  std::lock_guard<std::mutex> lock(print_mtx_);
  std::cout << "count == " << value << std::endl;
}

counter c;
void change_count()
{
  int value = c.increment();
  print_value(value);
}

int main()
{
  std::thread t1(change_count);
  std::thread t2(change_count);

  t1.join();
  t2.join();
}
```
* unlock[color ff0000]


###出力
```
count == 1
count == 2
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


