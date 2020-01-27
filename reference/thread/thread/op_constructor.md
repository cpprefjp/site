# コンストラクタ
* thread[meta header]
* std[meta namespace]
* thread[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
thread() noexcept;                      // (1)

template <class F, class ...Args>
explicit thread(F&& f, Args&&... args); // (2)

thread(const thread&) = delete;         // (3)
thread(thread&&) noexcept;              // (4)
```


## 概要
- (1) : デフォルトコンストラクタ。新しいスレッドを生成せず、空の状態にする。
- (2) : 新しいスレッドを生成し、そのスレッド上で引数`args...`を渡して、関数オブジェクト`f`を呼び出す。
- (3) : コピーコンストラクタ。コピー不可。
- (4) : ムーブコンストラクタ。スレッドの所有権を移動する。


## 要件
- (2) : 型`F`および`Args`に含まれるすべての型`Ti`はムーブコンストラクト可能な型でなければならない。また、[`INVOKE`](/reference/concepts/Invoke.md)`(DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<Args>(args))...)`が有効な式でなければならない。


## 効果
- (2) : 新しいスレッドを生成し、[`INVOKE`](/reference/concepts/Invoke.md)`(DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<Args>(args))...)`を実行する。ただし`DECAY_COPY`は同コンストラクタを呼び出したスレッド上にて評価される。また`f`のコピーの戻り値は無視される。
    - `DECAY_COPY(x)`は `template <class T> typename std::decay<T>::type decay_copy(T&& v) { return` [`std::forward`](/reference/utility/forward.md)`<T>(v); }` と定義される。おおよそ、`x`が配列型なら先�要素へのポインタ、`x`が関数型ならその関数ポインタ、`x`がコピーコンストラクト可能な型なら`x`からコピーされたオブジェクト、`x`がムーブコンストラクト可能な型なら`x`からムーブされたオブジェクトとなる。

    - [`INVOKE`](/reference/concepts/Invoke.md)`(f, arg...)`は`f`が関数オブジェクトならば `f(arg...)` 形式の関数呼び出しとなる。詳細は[*INVOKE*](/reference/concepts/Invoke.md)の定義参照。
    もし[`INVOKE`](/reference/concepts/Invoke.md)`(DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<Args>(args))...)`呼び出しからcatchされない例外が送出された場合、[`std::terminate()`](/reference/exception/terminate.md)が呼び出されてプ�グラムは異常終了する。


## 同期
- (2) : 同コンストラクタの呼び出し完了は、fのコピーの呼び出し開始と**同期する**。つまり、「コンストラクタ呼び出し側スレッドT0でのコンストラクタ呼び出し完了」は、「新しいスレッド`T1`上での`f`のコピーの呼び出し開始」よりも**前に発生する**。


## 事後条件
- (1) : [`get_id()`](get_id.md) `==` [`id()`](id.md)。
- (2) : [`get_id()`](get_id.md) `!=` [`id()`](id.md)。`*this`は新しいスレッドと関連付けられる。
- (4) : ムーブ前の`x.`[`get_id()`](get_id.md) `==` [`get_id()`](get_id.md) かつ ムーブ後の`x.`[`get_id()`](get_id.md) `==` [`id()`](id.md)


## 例外
- (2) : 新しいスレッドの作成に失敗した場合、[`system_error`](/reference/system_error/system_error.md)例外を投げる。その例外オブジェクトには、以下のエラー状態が�定されうる：

    - `resource_unavailable_try_again` : 新たなスレッドを作るためのリソースが不足している。もしくはシステムやプ�セスが規定するスレッド数の上限を超過した。


## 備考
- (2) :
    - C++14 : [`std::decay`](/reference/type_traits/decay.md)`<F>::type`が`std::thread`型である場合、この関数はオーバー�ード解決に参加しない。


## 例
```cpp example
#include <memory>
#include <thread>
#include <utility>
#include <cassert>

int func(int v, int& ri, std::shared_ptr<int> sp, std::unique_ptr<int> up)
{
  // spはコピーされた値が、upはムーブされた値が渡されてくる
  v = ri = 42;

  int x = *sp + *up;
  assert(x == 7);
  return x;  // この戻り値は無視される
}

int main()
{
  int i1 = 0;
  int i2;
  std::shared_ptr<int> sp0 = std::make_shared<int>(5);
  std::unique_ptr<int> up0(new int(2));

  std::thread t( func, i1,  std::ref(i2), sp0, std::move(up0) );
  // ...
  t.join();

  assert(i1 == 0 && i2 == 42);

  return 0;
}
```
* std::shared_ptr[link /reference/memory/shared_ptr.md]
* std::make_shared[link /reference/memory/make_shared.md]
* std::unique_ptr[link /reference/memory/unique_ptr.md]
* std::move[link /reference/utility/move.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 
- [GCC](/implementation.md#gcc): 4.6.3, 4.7.0
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
    - 2012, 2013は、(2)での実引数の受け渡しにムーブを使用しない問題がある。上記の例でも、`std::unique_ptr<int>`の実引数でコンパイルエラーになる。
    - 2012はコピーコンストラクタのdeleteに対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。


## 参照
- [LWG Issue 2097. `packaged_task` constructors should be constrained](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2097)

