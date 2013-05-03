#release
```cpp
mutex_type* release() noexcept;
```

##概要

<b>ミューテックスの所有権を放棄する。</b>
<b></b>
<b>この関数を実行することで、unique_lockオブジェクトはミューテックスのアンロック責任を放棄する。この関数を実行したユーザーは、自分でミューテックスをアンロックする必要がある。</b>


##事後条件

- 保持しているミューテックスオブジェクトへのポインタがNULLになること
- `[owns_lock()](/reference/mutex/unique_lock/owns_lock.md) == false`になること


##戻り値

保持しているミューテックスオブジェクトへのポインタを返す


##例外

投げない


##例

```cpp
#include <iostream>
#include <thread>
#include <mutex>

class X {
  int value_ = 0;
  mutable std::mutex mtx_;
public:
  void add_value()
  {
    std::unique_lock<std::mutex> lk(mtx_);

    ++value_;

    std::mutex* m = lk.release(); // ミューテックスの所有権を放棄する
    m->unlock(); // 手動でロックを手放す
  }

  int get() const
  {
    std::lock_guard<std::mutex> lk(mtx_);
    return value_;
  }
};

int main()
{
  X x;

  std::thread t1([&] { x.add_value(); });
  std::thread t2([&] { x.add_value(); });

  t1.join();
  t2.join();

  std::cout << x.get() << std::endl;
}
```
* release[color ff0000]

###出力

```cpp
2
```

##バージョン


###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照


