# unlock
* mutex[meta header]
* std[meta namespace]
* mutex[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void unlock();
```

## 概要
ロックを手放す


## 要件
この関数を実行するスレッドがミューテックスの所有権を持っていること


## 効果
この関数を呼び出したスレッドが持つミューテックスの所有権を手放す


## 戻り値
なし


## 例外
投げない


## 備考
- この関数からの復帰が完了する前に、ほかのスレッドが同じミューテックスをロック・アンロックして破棄することがありうる。処理系はこのような状況を正しく扱うことが要求されるため、この関数から戻ったあとにミューテックスへアクセスしなければ、そのような使い方をしても問題ない。


## 例
```cpp example
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
* unlock()[color ff0000]
* mtx_.lock()[link lock.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified], 2015 [mark verified]


## 参照
- [LWG Issue 1218. `mutex` destructor synchronization](https://cplusplus.github.io/LWG/issue1218)
    - C++11で、アンロック直後にほかのスレッドがミューテックスを破棄する状況を処理系が正しく扱うことが要求される旨の注記が追加された
