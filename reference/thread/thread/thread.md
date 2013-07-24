#コンストラクタ(C++11)
```cpp
// デフォルト
thread() noexcept;

// explicitテンプレート
template <class F, class ...Args> explicit thread(F&& f, Args&&... args);

// コピー
thread(const thread&) = delete;

// ムーブ
thread(thread&&) noexcept;
```
* デフォルト[italic]
* explicitテンプレート[italic]
* コピー[italic]
* ムーブ[italic]


##概要
新しいスレッドを生成し、そのスレッド上で引数`args...`を渡して関数オブジェクトfを呼び出す。
デフォルトコンストラクタでは新しいスレッドを生成しない。また`thread`オブジェクトはムーブコンストラクト可能／コピーコンストラクト不可。


##要件（explicitコンストラクタのみ）
型`F`および`Args`に含まれるすべての型`Ti`はムーブコンストラクト可能な型でなければならない。また、[`INVOKE`](/reference/functional/invoke.md)`(DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<Args>(args))...)`が有効な式でなければならない。


##効果（explicitコンストラクタのみ）
新しいスレッドを生成し、[`INVOKE`](/reference/functional/invoke.md)`(DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<Args>(args))...)`を実行する。ただし`DECAY_COPY`は同コンストラクタを呼び出したスレッド上にて評価される。また`f`のコピーの戻り値は無視される。

- `DECAY_COPY(x)`は `template <class T> typename std::decay<T>::type decay_copy(T&& v) { return `[`std::forward`](/reference/utility/forward.md)`<T>(v); }` と定義される。おおよそ、`x`が配列型なら先頭要素へのポインタ、`x`が関数型ならその関数ポインタ、`x`がコピーコンストラクト可能な型なら`x`からコピーされたオブジェクト、`x`がムーブコンストラクト可能な型なら`x`からムーブされたオブジェクトとなる。

- `INVOKE(f, arg...)`は`f`が関数オブジェクトならば `f(arg...)` 形式の関数呼び出しとなる。詳細は[`INVOKE`](/reference/functional/invoke.md)の定義参照。
もし`INVOKE(DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<F>(f)), DECAY_COPY(`[`std::forward`](/reference/utility/forward.md)`<Args>(args))...)`呼び出しからcatchされない例外が送出された場合、[`std::terminate()`](/reference/exception/terminate.md)が呼び出されてプログラムは異常終了する。


##同期（explicitコンストラクタのみ）
同コンストラクタの呼び出し完了は、fのコピーの呼び出し開始と**同期する**。つまり、「コンストラクタ呼び出し側スレッドT0でのコンストラクタ呼び出し完了」は、「新しいスレッド`T1`上での`f`のコピーの呼び出し開始」よりも**前に発生する**。


##事後条件
- デフォルトコンストラクタ： [`get_id()`](./get_id.md)` == `[`id()`](./id.md)。
- explicitコンストラクタ： [`get_id()`](./get_id.md)` != `[`id()`](./id.md)。`*this`は新しいスレッドと関連付けられる。
- ムーブコンストラクタ：ムーブ前の`x.`[`get_id()`](./get_id.md)` == `[`get_id()`](./get_id.md) かつ ムーブ後の`x.`[`get_id()`](./get_id.md)` == `[`id()`](./id.md)


##例外（explicitコンストラクタのみ）
新しいスレッドの作成に失敗した場合、[`system_error`](/reference/system_error/system_error.md)例外を投げる。


##例
```cpp
#include <memory>
#include <thread>
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

  std::thread thd( func, i1,  std::ref(i2), sp0, std::move(up0) );
  // ...
  thd.join();

  assert(i1 == 0 && i2 == 42);

  return 0;
}
```
* std::shared_ptr[link /reference/memory/shared_ptr.md]
* std::make_shared[link /reference/memory/make_shared.md]
* std::unique_ptr[link /reference/memory/unique_ptr.md]

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): 
- [GCC](/implementation#gcc.md):
- [GCC, C++0x mode](/implementation#gcc.md): 4.6.3, 4.7.0
- [ICC](/implementation#icc.md):
- [Visual C++](/implementation#visual_cpp.md):


##参照
