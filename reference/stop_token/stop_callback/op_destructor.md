# デストラクタ
* stop_token[meta header]
* std[meta namespace]
* stop_callback[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
~stop_callback();
```

## 効果
[停止可能コールバック登録解除](../stoppable_token.md)を実行する（備考欄を参照）。

ほかに停止状態を共有しているオブジェクトがいない場合は、停止状態を扱うために確保したリソースを解放する。


## 備考
停止可能コールバック登録解除は次のように行われる。

もし自身と同じ停止状態を共有しているほかの[`stop_callback`](../stop_callback.md)が存在してそのコールバックが実行中だったとしても、自身のデストラクタの実行はブロックされない。

もしデストラクタの呼び出し中に自身のコールバックが別のスレッドで実行中だった場合は、そのコールバックの呼び出しから処理が戻るまでは、`stop_callback`のコンストラクタで受け取った関数オブジェクトが破棄されないようにデストラクタの実行がブロックされる。  
もしデストラクタの呼び出し中に自身のコールバックが同じスレッドで実行中だった場合は、デストラクタの実行はブロックされない。


## 例
```cpp example
#include <cassert>
#include <chrono>
#include <functional>
#include <memory>
#include <stop_token>
#include <thread>

// CallbackFunc の状態を表す構造体
struct CallbackFuncStatus
{
  std::atomic<bool> started { false };
  std::atomic<bool> finished { false };
  std::atomic<bool> destructed { false };
};

// 停止要求に応じて呼び出される関数オブジェクト
struct CallbackFunc {
  CallbackFunc(CallbackFuncStatus* cfs) : cfs_(cfs) {}
  CallbackFunc(CallbackFunc&& rhs) {
    cfs_ = rhs.cfs_;
    rhs.cfs_ = nullptr;
  }

  CallbackFunc & operator=(CallbackFunc&& rhs) {
    cfs_ = rhs.cfs_;
    rhs.cfs_ = nullptr;
    return *this;
  }

  ~CallbackFunc() {
    if(cfs_) { cfs_->destructed = true; }
  }

  void operator()() {
    cfs_->started = true;
    std::this_thread::sleep_for(std::chrono::milliseconds(1000));
    cfs_->finished = true;
  }

private:
  CallbackFuncStatus* cfs_ { nullptr };
};

int main()
{
  // デストラクタ呼び出しのときに別のスレッドで自身のコールバックが実行中な場合のサンプル
  {
    std::stop_source ss;
    std::thread t;
    CallbackFuncStatus cfs;
    {
      std::stop_callback cb { ss.get_token(), CallbackFunc(&cfs) };

      // 別スレッドで cb のコールバックを呼び出す
      t = std::thread([&] { ss.request_stop(); });
      std::this_thread::sleep_for(std::chrono::milliseconds(100));

      assert(cfs.started == true);
      assert(cfs.destructed == false);

    } // ここで cb のデストラクタが呼び出されるが、
      // 別のスレッドで自身のコールバックを実行中なので、
      // それが完了するまでデストラクタの実行がブロックされ、
      // stop_callback のコンストラクタに渡した関数オブジェクトは破棄されない。

    // デストラクタの呼び出しが完了したならば、
    // それに先立って関数オブジェクトも破棄されているはず。
    assert(cfs.finished == true);
    assert(cfs.destructed == true);

    t.join();
  }

  // デストラクタ呼び出しのときに同じスレッドで自身のコールバックが実行中な場合のサンプル
  {
    std::stop_source ss;
    std::function<void()> reset_cb;

    auto on_callback = [&] { reset_cb(); }; // 停止要求に応じて呼び出される関数オブジェクト。
    auto cb = std::make_unique<std::stop_callback<decltype(on_callback)>>(ss.get_token(), on_callback);

    reset_cb = [&] { cb.reset(); }; // on_callback の中から呼び出す処理。cb を破棄する。

    // この中で reset_cb() が呼び出され、 cb のデストラクタが呼び出される。
    // デストラクタとコールバックが同じスレッド上で呼び出されている場合は、
    // デストラクタの実行はブロックされない。
    ss.request_stop();

    assert(cb == nullptr);
  }
}
```
* stop_source[link ../stop_source.md]
* stop_callback[link ../stop_callback.md]
* request_stop()[link ../stop_source/request_stop.md]
* get_token()[link ../stop_source/get_token.md]
* std::make_unique[link /reference/memory/make_unique.md]
* std::function[link /reference/functional/function.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0660R10 Stop token and joining thread](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0660r10.pdf)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
