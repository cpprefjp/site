# try_lock
* shared_mutex[meta header]
* std[meta namespace]
* shared_mutex[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
bool try_lock();
```

## 概要
排他ロックの取得を試みる


## 要件
この関数を呼び出したスレッドが、ミューテックスの排他所有権と共有所有権のいずれもを保持していないこと。


## 効果
ブロッキングせずに、この関数を呼び出したスレッドがミューテックスの排他所有権を取得する


## 戻り値
排他所有権が取得できなかった場合は何もせずに関数が`false`で返り、取得できた場合は`true`を返す。


## 例外
投げない


## 備考
この関数の実装が、ミューテックスの排他所有権を保持しているスレッドがひとつもない場合でも、排他所有権の取得に失敗する可能性がある。


## 例
```cpp
#include <thread>
#include <shared_mutex>

class X {
  mutable std::shared_mutex mtx_;
  int value_ = 0;
public:
  // メンバ変数value_への書き込みを排他的にする
  void add_value(int value)
  {
    // 排他ロックの取得を試みる
    if (!mtx_.try_lock()) {
      // 排他ロックの取得に失敗
      std::error_code ec(static_cast<int>(std::errc::device_or_resource_busy), std::generic_category());
      throw std::system_error(ec);
    }

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
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 3.7.1
- [GCC, C++17 mode](/implementation.md#gcc): 6.3
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
