# コルーチン [P0912R5]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
処理途中でのサスペンド(中断)／レジューム(再開)をサポートする一般化された関数として、[コルーチン](https://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%AB%E3%83%BC%E3%83%81%E3%83%B3)が導入される。

C++20時点では、コルーチン動作に関する言語仕様と新キーワード`co_return`, `co_await`, `co_yield`による新しい構文、コルーチンライブラリ実装者向けの低レベルライブラリ[`<coroutine>`](/reference/coroutine.md)のみが規定される。

```cpp
// コルーチンiotaを定義
my_generator iota(int end)
{
  for (int n = 0; n < end; ++n) {
    co_yield n;
  }
}

// コルーチンの呼び出し
auto g = iota(10);
for (int v: g) {
  std::cout << v;
}

// "my_generator"はライブラリが提供するべきクラス。
// 動作可能なサンプルコード全体は後述例を参照のこと。
```
* co_yield[color ff0000]

一般的なアプリケーション実装者からの利用を想定した、ジェネレータや非同期タスク・非同期I/Oといったハイレベルなコルーチンライブラリは、C++23以降での導入にむけて検討されている。

C++23ではジェネレータコルーチンを実現する[`<generator>`](/reference/generator.md)が追加された。


### 特徴
C++コルーチンの特徴は次の通り：

- 関数からコルーチンへの拡張: 従来からある関数(function)の呼出し(call)と復帰(return)に加えて、コルーチン(coroutine)では中断(suspend)と再開(resume)動作をサポートする。また中断状態のまま再開不要となったコルーチンに対しては、リソースリークを防ぐため明示的に破棄(destroy)を行える。
- 多数の __カスタマイズポイント__: コルーチンライブラリ実装者向けに、コルーチン動作の制御を可能とするカスタマイズポイントを規定する。後述するPromise、Awaitable、Awaiterなど。
- 軽量な __スタックレス(Stackless)コルーチン__: コルーチンの中断は実行中コルーチンのレキシカル・スコープ内でのみで許可され、コルーチンが呼び出した関数内では中断操作を行えない。（C++コルーチンの定義上、`co_await`や`co_yield`を用いて中断処理を記述すると、関数ではなくコルーチンとみなされる。）
- コルーチン毎の __動的メモリ確保__: コルーチン実引数の保持や進行状況を管理するため、動的メモリ確保が行われる可能性がある。ただし一定の条件を満たす場合には、[C++コンパイラ最適化により動的メモリ確保は省略される](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0981r0.html)と期待できる。
- __非対称(Asymmetric)・対称(Symmetric)コルーチン__: 中断処理によりコルーチン再開元へ制御を戻す非対称コルーチンのほか、明示的に別コルーチンの再開に制御を移す対称コルーチンをサポートする。待機動作をカスタマイズするAwaiterオブジェクト`await_suspend`にて制御する。
- __[スレッド(thread)](/reference/thread/thread.md)との直交__: あるスレッド上で実行されるコルーチンを中断し、その後に別スレッドから同コルーチンを再開させることもできる。ただし[スレッドローカルストレージ](/lang/cpp11/thread_local_storage.md)と組合せには注意が必要。

### 動作概略
C++コルーチン動作理解の助けとなるよう、ここでは細部を省略した説明を行う。
コルーチン実行の基本動作は、それぞれ下記ように説明される：

- 呼出し: 通常の関数と同様に、括弧(`()`)を用いた関数呼び出し構文を用いる。コルーチンに対応するユーザ定義Promiseオブジェクトが自動的に生成されるため、そこからコルーチンハンドルを取得する。
- 中断: コルーチン本体にて`co_yield`式または`co_await`式を記述する。中断されたコルーチンから呼出元へは、コルーチンハンドルを内包するコルーチン戻り値型オブジェクトを返す。
- 再開: コルーチン中断により返された戻り値型オブジェクトを介して、コルーチンハンドルの再開関数[`resume`](/reference/coroutine/coroutine_handle/resume.md)を呼び出す。
- 復帰: コルーチン本体にて`co_return`文を記述、またはコルーチン本体終端まで到達する。全てのローカル変数とPromiseオブジェクトは破棄される。

この4種類の基本動作に対して、次のカスタマイズポイントが提供される。括弧内はコルーチンライブラリが実装すべきカスタマイズポイント名：

- コルーチン呼出し直後の動作: 初期サスペンドポイント(`initial_suspend`)にて、コルーチン本体の開始前に中断して戻り値型オブジェクトを返すか、そのままコルーチン本体を実行継続するかを制御する。
- コルーチン復帰直前の動作: 最終サスペンドポイント(`final_suspend`)にて、コルーチンを最後に中断して戻り値型オブジェクトを返すか、そのままコルーチンに関するリソースを破棄するかを制御する。前者を選択した場合、リソースリークを防ぐためコルーチンハンドルの破棄関数[`destroy`](/reference/coroutine/coroutine_handle/destroy.md)呼出しが必要となる。
- 値を伴うコルーチン中断: `co_yield`式により、コルーチンを中断すると同時に呼出元へ値を返す(`yield_value`)。
- 値を伴うコルーチン復帰: `co_return`文により、呼出元へ値を返す(`return_value`)。
- コルーチン中断／再開制御: `co_await`式により、コルーチン中断と再開に関する振る舞いを詳細に制御する(`await_transform`, `operator co_await`)。
    - コルーチン中断の条件: `co_await`式に対して、コルーチンを中断するか否かを判断する(`await_ready`)。
    - コルーチン中断直前の動作: `co_await`式に対して、コルーチンを中断する直前の動作を制御する(`await_suspend`)。
    - コルーチン再開直後の動作: `co_await`式に対して、コルーチンが再開された直後の動作を制御する(`await_resume`)。

プログラマが記述するコルーチンは、コンパイル時にソースコード変換が行われると解釈できる。
（従来のC++仕様範囲ではコルーチン動作を正確に表現できないため、下記はあくまでも疑似的なコードとなる）：

```cpp
// プログラマが記述するコルーチン
my_generator iota(int end)
{
  for (int n = 0; n < end; ++n) {
    co_yield n;
  }
}

// C++コンパイラにより展開されたコード
my_generator iota(int end)
{
  // コルーチンに対応するPromiseオブジェクトを初期化
  my_generator::promise_type promise;

  // 戻り値型オブジェクトの初期化
  my_generator result = promise.get_return_object();
  // コルーチンハンドルをget_return_object内で取得し、resultメンバで保持する。
  // 生成したresultオブジェクトは、初回のコルーチン中断時に呼出元へ返される。

  // 本例では全て co_await std::suspend_always{} 相当のため、
  // 以降のco_await式(★箇所)においてコルーチンは中断／再開される。

  // 初期サスペンドポイント
  co_await promise.initial_suspend(); //★

  // コルーチン本体部
  {
    for (int n = 0; n < end; ++n) {
      // co_yield式は下記co_await式に展開される
      co_await promise.yield_value(n); //★
    }
  }
  promise.return_void();

  // 最終サスペンドポイント
  co_await promise.final_suspend(); //★

  // 本例では最終サスペンドポイントでコルーチンを中断するため、ここには制御が到達しない。
  // 呼出側で戻り値オブジェクトを破棄すると、デストラクタ経由で本コルーチンは破棄される。
}
```
* co_yield[color ff0000]
* co_await[color ff0000]
* std::suspend_always{}[link /reference/coroutine/suspend_always.md]


## 仕様
### コルーチン定義
C++におけるコルーチンは、関数の一種として定義される。

関数本体に新キーワード`co_await`(Await式), `co_yield`(Yield式), `co_return`のいずれかが含まれるとき、その関数はコルーチンとなる。
つまり、戻り値型や引数リストなどのシグニチャからコルーチン／関数を区別することはできない。
コルーチンの引数宣言リストはC言語由来の可変引数リスト(`...`)を含んではならないが、[可変引数テンプレートのパラメータパック(`...`)](/lang/cpp11/variadic_templates.md)は利用できる。

```cpp
task<int> f();

task<void> g1() {
  int i = co_await f();
  std::cout << "f() => " << i << std::endl;
}

template <typename... Args>
task<void> g2(Args&&...) { // OK, "..."はパック展開
  int i = co_await f();
  std::cout << "f() => " << i << std::endl;
}

task<void> g3(int a, ...) { // エラー: 可変引数リストは許可されない
  int i = co_await f();
  std::cout << "f() => " << i << std::endl;
}
```
* co_await[color ff0000]

プログラムエントリポイントの`main`関数、`constexpr`関数、戻り値型をプレースホルダ(`auto`)で宣言された関数、クラス型のコンストラクタとデストラクタは、コルーチンとして定義できない。

### Promise型とコルーチン動作仕様
コルーチンのPromise型は、コルーチンの戻り値型`R`と引数リスト`P1`, `P2`, ..., `Pn`から決定されるクラス型である。

- デフォルト動作では`R::promise_type`がPromise型となる。
- ユーザプログラム中で[`std::coroutine_traits`](/reference/coroutine/coroutine_traits.md)トレイトを特殊化した場合は、`coroutine_traits<R, P1, P2, ..., Pn>::promise_type`がPromise型となる。
- コルーチンがクラスの非静的メンバの場合、`P1`は暗黙のオブジェクトパラメータ(`*this`の型)となる。

コルーチンは、その本体 _function-body_ が下記の通り置き換えられたかのように動作する：

```cpp
{
  promise-type promise promise-constructor-arguments ;
  try {
    co_await promise.initial_suspend() ;
    function-body
  } catch ( ... ) {
    if (! initial-await-resume-called )
      throw ;
    promise.unhandled_exception() ;
  }
final-suspend :
  co_await promise.final_suspend() ;
}
```
* promise-type[italic]
* promise-constructor-arguments[italic]
* promise[italic]
* function-body[italic]
* initial-await-resume-called[italic]
* final-suspend[italic]

- `initial_suspend`呼び出しを含むAwait式は、初期サスペンドポイントとなる。
- `final_suspend`呼び出しを含むAwait式は、最終サスペンドポイントとなる。
- _initial-await-resume-called_ は`false`で初期化され、初期サスペンドポイントの式 _await-resume_ が評価される直前に`true`が設定される。
- _promise-type_ はPromise型を表す。
- 説明用の変数名 _promise_ は、コルーチンのPromiseオブジェクトを表す。
- ラベル _final-suspend_ は説明のためにのみ定義される。
- _promise-constructor-arguments_ は次の通りに決定される:
    - 引数リスト`Pi`の左辺値を`pi`とする。コルーチンが非静的メンバの場合、`p1`は`*this`を表し`p(i+1)`はi番目の関数パラメータを表す。
    - 左辺値`p1`...`pn`の実引数リストを用いて、Promiseコンストラクタ呼び出しのオーバーロード解決を試みる。
    - 適合するコンストラクタが見つかった場合は、_promise-constructor-arguments_ は `(p1, ..., pn)` となる。見つからなかった場合、_promise-constructor-arguments_ は空のリストとなる。

Promise型のスコープにおいて、非修飾な`return_void`および`return_value`の探索が行われる。両方が見つかった場合、プログラムは不適格となる。

コルーチン呼び出しのglvalue結果またはprvalue結果オブジェクトを初期化するために、式 _promise_`.get_return_object()`が使われる。
`get_return_object`呼び出しは高々1回であり、`initial_suspend`呼び出しよりも前に順序付けられる。

中断状態にあるコルーチンは、そのコルーチンを指すコルーチンハンドルの再開メンバ関数呼び出しによって、継続実行を再開できる。
再開メンバ関数を呼び出した関数は、再開元(resumer)と呼ばれる。
中断状態にないコルーチンに対する再開メンバ関数呼び出しは、未定義の動作をもたらす。

処理系はコルーチンのために追加のメモリ領域を確保する必要があるかもしれない。
このメモリ領域はコルーチン・ステートとして知られ、非配列版のメモリ確保関数(`operator new`)によって確保される。
メモリ確保関数はPromise型のスコープで名前探索が行われる。
名前探索に失敗した場合は、グローバルスコープで探索が行われる。
名前探索がPromise型のスコープで確保関数を見つけた場合は、実引数リストを用いて関数呼び出しのオーバーロード解決が行われる。
第1引数は`std::size_t`型であり、要求メモリサイズの合計値となる。続く実引数は左辺値`p1`...`pn`となる。
適合する関数が見つからなかった場合、`std::size_t`型の要求メモリサイズ合計値のみで再度オーバーロード解決が行われる。

Promise型のスコープにおいて、非修飾な`get_return_object_on_allocation_failure`の探索が行われる。
何らかの宣言が見つかった場合、グローバルな`::operator new(size_t nothrow_t)`形式の確保関数が選択され、メモリ領域確保に失敗すると、コルーチン・ステート用メモリ領域取得のための確保関数呼び出し結果は`nullptr`を返すと想定される。
このケースにおける確保関数は、例外を投げないnoexcept指定されるべきである。
メモリ確保関数が`nullptr`を返した場合、コルーチンはその呼び出し元に制御を戻し、戻り値は`T::get_return_object_on_allocation_failure()`呼び出しにより取得する。
ここで`T`はPromise型を表す。

```cpp example
#include <iostream>
#include <coroutine>

// メモリ確保が必要となったときは::operator new(size_t, nothrow_t)が使われる
struct generator {
  struct promise_type;
  using handle = std::coroutine_handle<promise_type>;
  struct promise_type {
    int current_value;
    static auto get_return_object_on_allocation_failure() { return generator{nullptr}; }
    auto get_return_object() { return generator{handle::from_promise(*this)}; }
    auto initial_suspend() { return std::suspend_always{}; }
    auto final_suspend() noexcept { return std::suspend_always{}; }
    void unhandled_exception() { std::terminate(); }
    void return_void() {}
    auto yield_value(int value) {
      current_value = value;
      return std::suspend_always{};
    }
  };
  bool move_next() { return coro ? (coro.resume(), !coro.done()) : false; }
  int current_value() { return coro.promise().current_value; }
  generator(generator const&) = delete;
  generator(generator && rhs) : coro(rhs.coro) { rhs.coro = nullptr; }
  ~generator() { if (coro) coro.destroy(); }
private:
  generator(handle h) : coro(h) {}
  handle coro;
};

generator f() { co_yield 1; co_yield 2; }

int main() {
  auto g = f();
  while (g.move_next()) std::cout << g.current_value() << std::endl;
}
```
* co_yield[color ff0000]
* std::coroutine_handle<promise_type>[link /reference/coroutine/coroutine_handle.md]
* from_promise[link /reference/coroutine/coroutine_handle/from_promise.md]
* resume()[link /reference/coroutine/coroutine_handle/resume.md]
* done()[link /reference/coroutine/coroutine_handle/done.md]
* promise()[link /reference/coroutine/coroutine_handle/promise.md]
* destroy()[link /reference/coroutine/coroutine_handle/destroy.md]
* suspend_always[link /reference/coroutine/suspend_always.md]
* std::terminate[link /reference/exception/terminate.md]

コルーチンの終端まで制御が到達、またはコルーチンを指すコルーチンハンドルの[`destroy`](/reference/coroutine/coroutine_handle/destroy.md)メンバ関数が呼び出されると、コルーチン・ステートは破棄される。

メモリ解放関数はPromise型のスコープで名前探索が行われる。
名前探索に失敗した場合は、グローバルスコープで探索が行われる。
解放関数の探索が、ポインタパラメータのみの通常の解放関数と、ポインタとサイズをパラメータにとる通常の解放関数の両方を見つける場合、2個のパラメータをとる解放関数が選択される。
そうでなければ、1個のパラメータをとる解放関数が選択される。
通常の解放関数が見つからなければ、プログラムは不適格となる。
選択された解放関数の呼び出しでは、その第1実引数に解放すべきメモリブロックのアドレスが渡される。
解放関数のパラメータに`std::size_t`が使われる場合、その実引数としてメモリブロックのサイズが渡される。

コルーチンが呼び出されるとき、パラメータ初期化が行われたのち、各コルーチンパラメータのコピーが作成される。
型cv `T`をもつパラメータにおいて、そのコピーはパラメータを参照する`T`型のxvalueで直接初期化された自動記憶域期間をもつcv `T`型の変数となる。
各パラメータのコピーの初期化と破棄は、呼び出されたコルーチンのコンテキストで行われる。
パラメータのコピーの初期化は、コルーチンPromiseコンストラクタの呼び出しより前に順序付けられ、それぞれは互いに非決定順で順序付けられる。
パラメータのコピーの生存期間は、パラメータPromiseオブジェクトの終了直後で終了する。
（コルーチンが参照渡しのパラメータを持つ場合、そのパラメータにより参照されるエンティティ生存期間終了後のコルーチン再開は未定義動作を引き起こしやすい。）

式 _promise_`.unhandled_exception()`の評価が例外で終了した場合、コルーチンは最終サスペンドポイントで中断したとみなされる。

式 `co_await ` _promise_`.final_suspend()` は例外送出してはならない。

### Await式
`co_await`式は、そのオペランド式で表される計算の完了を待機しているあいだ、コルーチン評価をサスペンド(中断)するために用いる。

```cpp
co_await cast-expression
```
* cast-expression[italic]

Await式は、コルーチン本体複合文の内側（かつ`try`～`catch`構文の`catch`節の外側）において潜在的に評価される式(potentially-evaluated expression)でのみ、出現してよい。
宣言文やfor構文の宣言を伴う初期化部では、その初期化子の中でのみAwait式が出現してよい。
デフォルト引数ではAwait式を用いることはできない。
Await式は、静的記憶域もしくは[スレッドローカル](/lang/cpp11/thread_local_storage.md)なブロックスコープ変数の初期化に出現してはならない。
関数内でAwait式を置けるコンテキストを、関数の中断コンテキストと呼ぶ。

Await式の評価では、次のような補助的な型、式、オブジェクトを用いる：

- _p_ を同Await式を含むコルーチンのPromiseオブジェクトの左辺値名とし、`P`を同オブジェクトの型とする。
- _a_ (Awaitable) を下記のように定義する：
    - Await式がYield式または初期サスペンドポイントまたは最終サスペンドポイントにより暗黙に生成された場合、_a_ をその _cast-expression_ とする。
    - `P`のスコープで非修飾な`await_transform`の探索により一つ以上の名前がみつかった場合は、 _a_ を _p_`.await_transform(` _cast-expression_ `)`とする。
    - それ以外では _a_ を _cast-expression_ とする。
- _o_ (Awaiter) を下記のように定義する。_o_ がprvalueの場合は[Temporary materialization conversion](https://cpprefjp.github.io/lang/cpp17/guaranteed_copy_elision.html)が行われる：
    - 実引数 _a_ に対して適用可能な`operator co_await`関数を列挙し、_o_ をオーバーロード解決により選択された関数呼び出しとする。
    - 適合する関数が見つからない場合、_o_ を _a_ とする。
    - オーバーロード解決が曖昧な場合、プログラムは不適格となる。
- _e_ を、_o_ の評価結果を参照する左辺値とする。
- _h_ を、同Await式を含むコルーチンを参照する[`std::coroutine_handle<P>`](/reference/coroutine/coroutine_handle.md)型のオブジェクトとする。
- _await-ready_ を、`bool`に変換されうる式 _e_`.await_ready()`とする。
- _await-suspend_ を、式 _e_`.await_suspend(` _h_ `)`とする。この式（の結果）は`void`であるか、`bool`または任意の型`Z`に対する[`std::coroutine_handle<Z>`](/reference/coroutine/coroutine_handle.md)型のprvalueであるべき。
- _await-resume_ を、式 _e_`.await_resume()`とする。

Await式は式 _await-resume_ と同じ型、同じ値カテゴリを持つ。

Await式は式 _o_ と式 _await-ready_ を評価し、続いて：

- _await-ready_ の結果が`false`の場合、コルーチンは中断状態とみなされる。その後に：
    - _await-suspend_ の型が[`std::coroutine_handle<Z>`](/reference/coroutine/coroutine_handle.md)の場合、_await-suspend_[`.resume()`](/reference/coroutine/coroutine_handle/resume.md)が評価される。
    - そうではなく _await-suspend_ の型が`bool`の場合、_await-suspend_ が評価され、その結果が`false`であればコルーチンは再開する。
    - それ以外の場合、_await-suspend_ が評価される。
- _await-suspend_ の評価が例外で終了した場合、例外が捕捉されてコルーチンが再開し、その例外は即座に再スローされる。そうでなければ、スコープ終了をともなわずに現在のコルーチンの呼出元もしくは再開元へ制御フローを戻す。
- _await-ready_ の結果が`true`またはコルーチンが再開した場合、_await-resume_ の評価結果がAwait式の結果となる。

```cpp
template <typename T>
struct my_future {
  /* ... */
  bool await_ready();
  void await_suspend(std::coroutine_handle<>);
  T await_resume();
};

template <class Rep, class Period>
auto operator co_await(std::chrono::duration<Rep, Period> d) {
  struct awaiter {
    std::chrono::system_clock::duration duration;
    /* ... */
    awaiter(std::chrono::system_clock::duration d) : duration(d) {}
    bool await_ready() const { return duration.count() <= 0; }
    void await_resume() {}
    void await_suspend(std::coroutine_handle<> h) { /* ... */ }
  };
  return awaiter{d};
}

using namespace std::chrono;

my_future<int> h();

my_future<void> g() {
  std::cout << "just about go to sleep...\n";
  co_await 10ms;
  std::cout << "resumed\n";
  co_await h();
}

auto f(int x = co_await h()); // エラー: await式は関数中断コンテキストの外
int a[] = { co_await h() };   // エラー: await式は関数中断コンテキストの外
```
* co_await[color ff0000]
* std::coroutine_handle<>[link /reference/coroutine/coroutine_handle.md]

### Yield式
`co_yield`式は、コルーチンから値を生成(yield)するときに用いる。
その動作はAwait式にて書き換え可能であり、コルーチン利用者向けのシンタックスシュガーとも解釈できる。

```cpp
co_yield assignment-expression
co_yield braced-init-list
```
* assignment-expression[italic]
* braced-init-list[italic]

Yield式は関数の中断コンテキストにのみ出現してよい。
_e_ をYield式のオペランド、_p_ を同式を含むコルーチンのPromiseオブジェクトのlvalue名としたとき、Yield式は式`co_await` _p_`.yield_value(` _e_ `)`と等価である。

```cpp
template <typename T>
struct generator {
  struct promise_type {
    T current_value;
    /* ... */
    auto yield_value(T v) {
      current_value = std::move(v);
      return std::suspend_always{};
    }
  };
  struct iterator { /* ... */ };
  iterator begin();
  iterator end();
};

generator<pair<int,int>> g1() {
  for (int i = i; i < 10; ++i) co_yield {i,i};
}
generator<pair<int,int>> g2() {
  for (int i = i; i < 10; ++i) co_yield make_pair(i,i);
}

auto f(int x = co_yield 5); // エラー: yield式は関数中断コンテキストの外
int a[] = { co_yield 1 };   // エラー: yield式は関数中断コンテキストの外

int main() {
  auto r1 = g1();
  auto r2 = g2();
  assert(std::equal(r1.begin(), r1.end(), r2.begin(), r2.end()));
}
```
* co_yield[color ff0000]
* std::suspend_always[link /reference/coroutine/suspend_always.md]
* std::move[link /reference/utility/move.md]
* pair[link /reference/utility/pair.md]
* make_pair[link /reference/utility/make_pair.md]
* std::equal[link /reference/algorithm/equal.md]

## co_return文
`co_return`文は、コルーチンを終了し呼出元へ制御を戻すために用いる。
`co_yield`／`co_await`いずれも含まないコルーチンを定義する場合にも利用できる。

```cpp
co_return expr-or-braced-init-list opt ;
```
* expr-or-braced-init-list[italic]
* opt[italic]

`co_return`文または中断により、コルーチンは呼出元もしくは再開元に制御を戻す。
コルーチンは通常の`return`文を含んではならない。

`co_return`文の _expr-or-braced-init-list_ はオペランドと呼ばれる。
_p_ をコルーチンPromiseオブジェクトのlvalue名とすると、`co_return`文は次と等価である：

```cpp
{ S; goto final-suspend ; }
```
* S[italic]
* final-suspend[italic]

ここで _final-suspend_ はコルーチン動作説明用の最終サスペンドポイントラベル名であり、_S_ は次の通り定義される：

- オペランドが _braced-init-list_ または非`void`型の式の場合、_S_ を _p_`.return_value(` _expr-or-braced-init-list_ `)`とする。式 _S_ は `void`型のprvalueであるべき。
- そうでなければ、_S_ を複合文 `{` _expression_ _opt_ `;` _p_`.return_void(); }`とする。式 _p_`.return_void()`は`void`型のprvalueであるべき。

_p_`.return_void()`が有効な式のとき、コルーチン本体の終端到達はオペランド無し`co_return`と等価である。
そうでなければ、コルーチン本体の終端到達は未定義の動作を引き起こす。


## 例
```cpp example
#include <iostream>
#include <coroutine>
#include <utility>

// コルーチン利用ライブラリ: ジェネレータ型
struct my_generator {
  // ジェネレータに関連付けられるPromise型
  struct promise_type {
    // co_yield式で指定されるint値を保持する変数
    int value_;

    auto get_return_object()
    {
      // コルーチンに紐づくPromiseオブジェクト(*this)から
      // ジェネレータ型のコルーチン戻り値オブジェクトを生成
      return my_generator{*this};
    };
    auto initial_suspend()
    {
      // コルーチン本体処理の開始前に無条件サスペンド
      return std::suspend_always{};
    }
    auto final_suspend() noexcept
    {
      // コルーチン本体処理の終了後に無条件サスペンド
      return std::suspend_always{};
    }
    auto yield_value(int v)
    {
      // co_yield式で渡される値を保持し、コルーチンを無条件サスペンド
      value_ = v;
      return std::suspend_always{};
    }
    void return_void() {}
    void unhandled_exception() { std::terminate(); }
  };
  // ジェネレータに関連付けられるコルーチンハンドル型
  using coro_handle = std::coroutine_handle<promise_type>;

  // 範囲for構文サポート用イテレータ型
  struct iterator {
    // 対象のコルーチンハンドル
    coro_handle coro_;
    // 対象コルーチン本体処理が終了したかを表すフラグ
    bool done_;

    iterator& operator++()
    {
      // yield_value()で中断したコルーチンを再開する
      coro_.resume();
      // (co_yield式評価もしくはコルーチン本体処理の終了により制御が戻ってくる)
      done_ = coro_.done();
      return *this;
    }
    bool operator!=(const iterator& rhs) const
    {
      return done_ != rhs.done_;
    }
    int operator*() const
    {
      // Promiseオブジェクトが保持している値を返す
      return coro_.promise().value_;
    }
  };

  ~my_generator()
  {
    if (coro_)
      coro_.destroy();
  }

  my_generator(my_generator const&) = delete;
  my_generator(my_generator&& rhs) 
    : coro_(std::exchange(rhs.coro_, nullptr)) {}

  // 範囲for構文サポート用のメンバ関数
  iterator begin()
  {
    // initial_suspend()で中断したコルーチンを再開する
    coro_.resume();
    // (初回co_yield式評価により制御が戻ってくる)
    return {coro_, coro_.done()};
  }
  iterator end()
  {
    // 終端位置を表現する番兵イテレータ
    return {{}, true};
  }

private:
  // Promiseオブジェクト経由でコルーチンハンドルを取得する
  explicit my_generator(promise_type& p)
    : coro_(coro_handle::from_promise(p)) {}

  coro_handle coro_;
};


// ユーザ定義コルーチン
my_generator iota(int end)
{
  // コルーチンに対応したPromise型 generator::promise_typeの
  // Promiseオブジェクト(p)が生成される。

  for (int n = 0; n < end; ++n) {
    // 下式は co_await p.yield_value(n) と等価
    co_yield n;
  }
  // コルーチン本体の終端到達により p.return_void() 呼び出し
}

int main()
{
  // コルーチンを呼び出し、整数生成ジェネレータを取得する。
  auto g = iota(10);
  // このタイミングではまだコルーチン本体は実行されない。

  // 範囲for構文を用いてコルーチン本体を実行する。
  // ここではコルーチンiotaの値生成ループ処理ステップと、
  // main関数の表示ループ処理ステップが交互に実行される。
  for (int v: g) {
    std::cout << v;
  }
}
```
* co_yield[color ff0000]
* std::exchange[link /reference/utility/exchange.md]
* std::terminate()[link /reference/exception/terminate.md]
* std::coroutine_handle[link /reference/coroutine/coroutine_handle.md]
* std::suspend_always[link /reference/coroutine/suspend_always.md]
* destroy()[link /reference/coroutine/coroutine_handle/destroy.md]
* resume()[link /reference/coroutine/coroutine_handle/resume.md]
* done()[link /reference/coroutine/coroutine_handle/done.md]
* from_promise[link /reference/coroutine/coroutine_handle/from_promise.md]
* promise()[link /reference/coroutine/coroutine_handle/promise.md]

### 出力
```
0123456789
```


## この機能が必要になった背景・経緯

多くのプログラミング言語で対応されており広い実績のあるコルーチン機能を、C++言語でも使えるよう[2013年頃](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3708.pdf)から検討が始まっている。

2017年には [ISO/IEC TS 22277 C++ Extensions for Coroutines](https://www.iso.org/standard/73008.html)（通称"Coroutines TS"） として正式発効され、いくつかの追加の仕様修正をへてC++20言語仕様本体への統合が決定された。

C++言語仕様へのコルーチン導入によって、ジェネレータの協調的マルチタスクのサポート、ファイルやネットワークなど非同期I/Oライブラリとの統合が期待されている。


## 検討されたほかの選択肢

C++20コルーチンはスタックレスコルーチンとして導入されたが、スタックフル(Stackful)コルーチン＝ファイバー(Fiber)の導入検討も長らく行われてきた。
スタックフルコルーチンは将来のC++仕様導入に向けて引き続き検討されている。
（本ページ執筆時点では[提案文書P0876R10](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p0876r10.pdf)が最新）

C++20コルーチンでは、コルーチン・ステートのために動的メモリ確保が行われる可能性がある。
一定条件を満たせばコンパイラ最適化によって動的メモリ確保が省略されるとしているが、言語仕様として動的メモリ確保を避ける仕様も検討された（通称"Core Coroutines"）。
最終的には既に実績のあるCoroutinesTS（発案者の名前にちなみ"Gor-routines"と呼ばれた）ベースのコルーチン仕様が採用されることになった。

C++20コルーチンに関するキーワードは、いずれも接頭辞`co_`が付与されている。
何度かの改名提案（[P0071R0](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0071r0.html)、[P1485R1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1485r1.html)）も提出されたが、いずれも否決されてC++20仕様に落ち着いた。


## <a id="relative-page" href="#relative-page">関連項目</a>
- C++20 [`<coroutine>`](/reference/coroutine.md)
- C++23 [`<generator>`](/reference/generator.md)


## 参照
- [N4680 C++ Extensions for Coroutines(Coroutines TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/n4680.pdf)
- [P0911R1 Rebase the Coroutines TS onto the C++17 Standard](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0911r1.html)
- [P0913R1 Add symmetric coroutine control transfer](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0913r1.html)
- [P0914R1 Add parameter preview to coroutine promise constructor](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0914r1.html)
- [P0664R4 C++ Coroutine TS Issues](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0664r4.html)
- [P0912R5 Merge Coroutines TS into C++20 working draft](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0912r5.html)

- [Coroutine Theory](https://lewissbaker.github.io/2017/09/25/coroutine-theory)
- [C++ Coroutines: Understanding operator co_await](https://lewissbaker.github.io/2017/11/17/understanding-operator-co-await)
- [C++ Coroutines: Understanding the promise type](https://lewissbaker.github.io/2018/09/05/understanding-the-promise-type)
- [C++ Coroutines: Understanding Symmetric Transfer](https://lewissbaker.github.io/2020/05/11/understanding_symmetric_transfer)
- [C++ co_awaiting coroutines](https://web.archive.org/web/20210421165652/https://blog.panicsoftware.com/co_awaiting-coroutines/)
- [20分くらいでわかった気分になれるC++20コルーチン](https://www.slideshare.net/yohhoy/20c20)