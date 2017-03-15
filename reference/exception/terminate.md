# terminate
* exception[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  [[noreturn]] void terminate() noexcept;
}
```

## 概要
`terminate()`は、プログラムを異常終了させる関数である。

この関数は、特定の状況で呼び出されることが規定されている。

もちろん、ユーザーが任意に呼び出すこともできる。

## この関数が呼び出される状況
以下のいずれかに該当する場合、この`terminate()`関数が呼び出される。

- 以下の場合で例外送出により脱出しようとした
	- 例外オブジェクトの初期化完了後～`catch`節に突入する前の間に呼び出される関数
	- `noexcept`または`noexcept(trueに評価される定数式)`が指定されている関数
	- 例外処理に伴う自動変数（スタック上のオブジェクト）のデストラクタ
	- 非ローカル変数の初期化
	- 静的記憶期間・スレッド静的記憶期間のオブジェクトのデストラクタ
	- [`exit()`](/reference/cstdlib/exit.md)や[`quick_exit()`](/reference/cstdlib/quick_exit.md)内で呼び出される[`atexit()`](/reference/cstdlib/atexit.md)や[`at_quick_exit()`](/reference/cstdlib/at_quick_exit.md)で登録した関数
	- [`set_unexpected()`](set_unexpected.md)で登録したハンドラで以下すべてを満たす場合
		- 発端となった例外指定に含まれない例外がハンドラから送出された
		- 発端となった例外指定に[`bad_exception`](bad_exception.md)が含まれない
	- スレッドの開始関数（[`thread`のコンストラクタ](../thread/thread/op_constructor.md)で渡した関数）
- 例外処理中でないのに式を持たない`throw`式を実行しようとした
- デフォルトの予想外の例外のハンドラ（[`set_unexpected()`](set_unexpected.md)が呼び出されていない状況でのハンドラ）が呼び出された
- [`nested_exception::rethrow_nested()`](nested_exception/rethrow_nested.md)が例外を捕捉していない状況で呼び出された
- join可能な`thread`（[`thread::joinable()`](../thread/thread/joinable.md)が`true`であるもの）に対して、デストラクタまたは代入演算子が実行された


## 効果
終了ハンドラを呼び出す。

終了ハンドラは[`set_terminate()`](set_terminate.md)で指定できる。

デフォルトの終了ハンドラは[`abort()`](/reference/cstdlib/abort.md)を呼び出すことと規定されている。


## 戻り値
なし


## 例外
投げない


## 例
```cpp
#include <iostream>
#include <exception>

int main()
{
  std::cout << "before terminate" << std::endl;

  std::terminate(); // プログラムを終了させる

  std::cout << "after terminate" << std::endl; // 実行されない
}
```
* std::terminate[color ff0000]

### 出力例
```
This application has requested the Runtime to terminate it in an unusual way.
Please contact the application's support team for more information.
terminate called without an active exception
```

## 参照
- 関係する関数
	- [`get_terminate`](get_terminate.md)
	- [`set_terminate`](set_terminate.md)
- `terminate`が呼び出される状況
	- N3337 15.5.1 The `std::terminate()` function `[except.terminal]`
