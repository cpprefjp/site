# try_lock
* shared_mutex[meta header]
* std[meta namespace]
* shared_timed_mutex[meta class]
* function[meta id-type]
* cpp14[meta cpp]

```cpp
bool try_lock();
```

## 概要
排他�ックの取得を試みる


## 要件
この関数を呼び出したスレッドが、ミューテックスの排他所有権と共有所有権のいずれもを保持していないこと。


## 効果
ブ�ッ�ングせずに、この関数を呼び出したスレッドがミューテックスの排他所有権を取得する


## 戻り値
排他所有権が取得できなかった場合は何もせずに関数が`false`で返り、取得できた場合は`true`を返す。


## 例外
投げない


## 備考
この関数の実装が、ミューテックスの排他所有権を保持しているスレッドがひとつもない場合でも、排他所有権の取得に失敗する可能性がある。


## 例
```cpp example
#include <thread>
#include <shared_mutex>

class X {
  mutable std::shared_timed_mutex mtx_;
  int value_ = 0;
public:
  // メンバ変数value_への書き込みを排他的にする
  void add_value(int value)
  {
    // 排他�ックの取得を試みる
    if (!mtx_.try_lock()) {
      // 排他�ックの取得に失敗
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }

    value_ = value;
    mtx_.unlock(); // 排他�ックを手放す
  }

  // メンバ変数value_の値を�み込む
  int get_value() const
  {
    int result = 0;
    mtx_.lock_shared(); // 共有�ックを取得する
    result = value_;
    mtx_.unlock_shared(); // 共有�ックを手放す
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
* try_lock[color ff0000]
* unlock()[link unlock.md]
* lock_shared()[link lock_shared.md]
* unlock_shared()[link unlock_shared.md]
* std::thread[link /reference/thread/thread.md]
* join()[link /reference/thread/thread/join.md]
* std::error_code[link /reference/system_error/error_code.md]
* std::errc::device_or_resource_busy[link /reference/system_error/errc.md]
* std::generic_category()[link /reference/system_error/generic_category.md]
* std::system_error[link /reference/system_error/system_error.md]

### 出力例
```
```

## バージョン
### 言語
- C++14

### 処理系
- [Clang](/implementation.md#clang): 3.5
- [GCC](/implementation.md#gcc): 4.9
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015
