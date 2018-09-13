# コンストラクタ
* mutex[meta header]
* std[meta namespace]
* lock_guard[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit lock_guard(mutex_type& m);      // (1)
lock_guard(mutex_type& m, adopt_lock_t); // (2)

lock_guard(lock_guard const&) = delete;  // (3)
```
* adopt_lock_t[link /reference/mutex/adopt_lock.md]

## 概要
- (1) : 非ロック状態のミューテックスオブジェクトへの参照を受け取り、メンバ変数として参照を保持する。
- (2) : ロック済みミューテックスオブジェクトへの参照を受け取り、メンバ変数として参照を保持する。
- (3) : コピーコンストラクタ。コピー不可。非自明なコンストラクタが定義されているため、ムーブコンストラクタは定義されない


## 効果
- (1) : `m.lock()`


## 例外
- (2) : 投げない


## 例
```cpp example
#include <iostream>
#include <mutex>

int main()
{
  std::mutex mtx;

  {
    std::lock_guard<std::mutex> lk(mtx); // ロックを取得する

    // ...共有リソースにアクセス...

  } // ロックを手放す

  {
    mtx.lock();
    std::lock_guard<std::mutex> lk(mtx, std::adopt_lock); // ロック済みミューテックスを渡す

    // ...共有リソースにアクセス...

  } // ロックを手放す
}
```
* mtx.lock()[link /reference/mutex/mutex/lock.md]
* std::adopt_lock[link /reference/mutex/adopt_lock.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
    - 2012はコピーコンストラクタのdeleteに対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。


## 参照


