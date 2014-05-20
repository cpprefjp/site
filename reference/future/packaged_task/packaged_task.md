#コンストラクタ (C++11)
```cpp
packaged_task() noexcept;
template <class F>
explicit packaged_task(F&& f);
template <class F, class Allocator>
explicit packaged_task(allocator_arg_t, const Allocator& a, F&& f);
packaged_task(packaged_task&) = delete;
packaged_task(packaged_task&& rhs) noexcept;
```
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]

##packaged_taskオブジェクトの構築

- `packaged_task() noexcept;`<br/>デフォルトコンストラクタ。共有状態なし、タスクの保持なしでオブジェクトを構築する。
- `template <class F>`<br/>`explicit packaged_task(F&& f);`<br/>関数オブジェクトを受け取るコンストラクタ。共有状態を初期化し、`f`を非同期実行するタスクとして`std::`[`forward`](/reference/utility/forward.md)`<F>(f)`でメンバ変数に保持する。<br/>例外： `F`のコピーコンストラクタもしくはムーブコンストラクタによって送出されうる、あらゆる例外が投げられる可能性がある。
- `template <class F, class Allocator>`<br/>`explicit packaged_task(allocator_arg_t, const Allocator& a, F&& f);`<br/>関数オブジェクトおよびカスタムアロケータを受け取るコンストラクタ。共有状態を初期化し、`f`を非同期実行するタスクとして`std::`[`forward`](/reference/utility/forward.md)`<F>(f)`でメンバ変数に保持する。アロケータ`a`は、共有状態を構築する際に、その内部構造でメモリ確保が必要な場合に使用される。<br/>例外： `F`のコピーコンストラクタもしくはムーブコンストラクタによって送出されうる、あらゆる例外が投げられる可能性がある。内部構造のメモリ確保に失敗した場合、`std::`[`bad_alloc`](/reference/new/bad_alloc.md)が投げられる。
- `packaged_task(const packaged_task&) = delete;`<br/>コピーコンストラクタ。コピー不可。
- `packaged_task(packaged_task&& rhs) noexcept;`<br/>ムーブコンストラクタ。`rhs`の共有状態の所有権、および非同期タスクの関数オブジェクトを`*this`に移動する。<br/>事後条件： `rhs`は共有状態を持たない


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
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0 （11.0はアロケータを引数に取るものがコンパイルできない？）


##参照


