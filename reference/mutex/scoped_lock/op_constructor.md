# コンストラクタ
* mutex[meta header]
* std[meta namespace]
* scoped_lock[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
explicit scoped_lock(MutexTypes&... m);               // (1)
explicit scoped_lock(MutexTypes&... m, adopt_lock_t); // (2)

scoped_lock(const scoped_lock&) = delete;             // (3)
```
* adopt_lock_t[link /reference/mutex/adopt_lock.md]

## 概要
- (1) : 非�ック状態のミューテックスオブジェクトへの参照を複数受け取り、メンバ変数として参照を保持する。
- (2) : �ック取得済みミューテックスオブジェクトへの参照を複数受け取り、メンバ変数として参照を保持する。
- (3) : コピーコンストラクタ。コピー不可。非自明なコンストラクタが定義されているため、ムーブコンストラクタは定義されない


## 効果
- (1) : `MutexTypes...`が空であればなにもしない。単一要素であれば`m.lock()`を呼び出し、そうでなければ[`lock`](/reference/mutex/lock.md)`(m...)`を呼び出す。


## 例外
- (2) : 投げない


## 例
```cpp example
#include <iostream>
#include <mutex>

int main()
{
  std::mutex m1;
  std::timed_mutex m2;

  // (1)
  {
    // m1とm2の�ックを取得
    std::scoped_lock<std::mutex, std::timed_mutex> lk{m1, m2};

    // ...共有リソースにアクセス...

  } // �ックを手放す

  // (2)
  {
    m1.lock();
    m2.lock();

    // �ック取得済みのミューテックスを、std::scoped_lockに管理させる
    std::scoped_lock lk(std::adopt_lock, m1, m2);

    // ...共有リソースにアクセス...

  } // �ックを手放す
}
```
* std::timed_mutex[link /reference/mutex/timed_mutex.md]
* m1.lock()[link /reference/mutex/mutex/lock.md]
* m2.lock()[link /reference/mutex/timed_mutex/lock.md]
* std::adopt_lock[link /reference/mutex/adopt_lock.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 5.0
- [GCC](/implementation.md#gcc): 7.3
- [Visual C++](/implementation.md#visual_cpp): ??
