#コンストラクタ (C++11)
* future[meta header]
* std[meta namespace]
* packaged_task[meta class]
* function[meta id-type]

```cpp
packaged_task() noexcept;                          // (1)

template <class F>
explicit packaged_task(F&& f);                     // (2)

template <class F, class Allocator>
explicit packaged_task(allocator_arg_t,
                       const Allocator& a, F&& f); // (3)

packaged_task(packaged_task&) = delete;            // (4) C++11
packaged_task(const packaged_task&) = delete;      // (4) C++14

packaged_task(packaged_task&& rhs) noexcept;       // (5)
```
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]

##概要

- (1) : デフォルトコンストラクタ。
- (2) : 関数オブジェクトを受け取るコンストラクタ。
- (3) : 関数オブジェクトおよびカスタムアロケータを受け取るコンストラクタ。
- (4) : コピーコンストラクタ。コピー不可。
- (5) : ムーブコンストラクタ。


##効果
- (1) : 共有状態なし、タスクの保持なしでオブジェクトを構築する。
- (2) : 共有状態を初期化し、`f`を非同期実行するタスクとして[`std::forward`](/reference/utility/forward.md)`<F>(f)`でメンバ変数に保持する。
- (3) : 共有状態を初期化し、`f`を非同期実行するタスクとして[`std::forward`](/reference/utility/forward.md)`<F>(f)`でメンバ変数に保持する。アロケータ`a`は、共有状態を構築する際に、その内部構造でメモリ確保が必要な場合に使用される。
- (5) : `rhs`の共有状態の所有権、および非同期タスクの関数オブジェクトを`*this`に移動する。


##例外
- (2) : `F`のコピーコンストラクタもしくはムーブコンストラクタによって送出されうる、あらゆる例外が投げられる可能性がある。
- (3) : `F`のコピーコンストラクタもしくはムーブコンストラクタによって送出されうる、あらゆる例外が投げられる可能性がある。内部構造のメモリ確保に失敗した場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)が投げられる。


##事後条件
- (5) : `rhs`は共有状態を持たない


##備考
- (2), (3) :
    - C++14 : [`std::decay`](/reference/type_traits/decay.md)`<F>::type`が`std::thread`型である場合、この関数はオーバーロード解決に参加しない。


##例
```cpp
#include <memory>
#include <future>

int foo() { return 3; }

int main()
{
  // デフォルト構築
  // 共有状態とタスクを持たない
  {
    std::packaged_task<int()> task;
  }

  // 関数オブジェクトを受け取って構築
  // 共有状態の初期化、およびタスクを内部に保持する
  {
    std::packaged_task<int()> task(foo);
  }

  // 関数オブジェクトとアロケータを受け取って構築
  // 共有状態をアロケータを使用して初期化子、タスクを内部に保持する
  {
    std::packaged_task<int()> task {
        std::allocator_arg,
        std::allocator<std::packaged_task<int()>>(),
        foo
    };
  }

  // ムーブ構築
  // 共有状態の所有権とタスクを移動する
  {
    std::packaged_task<int()> task1(foo);
    std::packaged_task<int()> task2 = std::move(task1);

    // task1は共有状態を持たない
  }
}
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 11.0 （11.0はアロケータを引数に取るものがコンパイルできない？）


##参照
- [LWG Issue 2067. `packaged_task` should have deleted copy c'tor with const parameter](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2067)
- [LWG Issue 2097. `packaged_task` constructors should be constrained](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2097)

