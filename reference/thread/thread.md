# thread
* thread[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class thread;
}
```

## 概要
クラス`thread`は、新しい実行のスレッド(thread of execution)（以下、単にスレッドとする）の作成／待機／その他操作を行う機構を提供する。

### threadオブジェクトとスレッドとの関係性
`thread`オブジェクトとスレッドは1:1の関係で対応づけられるが、両者は同一ではないことに留意。`thread`コンストラクタによって新しく作成されたスレッドは、その`thread`オブジェクトに関係付けられる。

`thread`コンストラクタでは新しいスレッドを1つ作成し、同コンストラクタを呼び出したスレッドはそのまま後続処理を続ける。一方で、新しいスレッド上では`thread`コンストラクタに与えた関数オブジェクトが呼び出される。つまりプ�グラム内に複数のスレッドが�在し、並行にそれぞれの処理を行うことが可能な状態となる。なお、複数のスレッドが真に並行実行されるか否かは処理系に依�する。（たとえばDual Core環境で4つのスレッドを作成することはできるが、ハードウェアの制約から同時処理されるのは2スレッド以下に制限される。）

新しいスレッド上で呼び出される関数オブジェクトから例外が送出された場合、[`std::terminate()`](/reference/exception/terminate.md)関数が呼び出されてプ�グラムは終了する。この動作が好ましくないのであれば、同関数オブジェクトから外に例外送出されないことをプ�グラマが保証しなければならない。

また、デフォルトコンストラクトされた`thread`オブジェクトは、何も指さない空の`thread`オブジェクトとなる。

### join操作とdetach操作

`thread`オブジェクトとスレッドが関連付けられた状態では、`thread`オブジェクトのメンバ関数`join()`を介してそのスレッド完了を待機することができる（join操作）。メンバ関数`join()`が呼び出された時点で`thread`オブジェクトに関連付けられたスレッドがまだ処理継続�だった場合、その対象スレッドが完了するまで呼び出し元スレッドがブ�ックされる。このjoin操作が終わった`thread`オブジェクトは、何も指さない空の`thread`オブジェクトとなる。

また`thread`オブジェクトのメンバ関数`detach()`により、`thread`オブジェクトとスレッドの関連付けを切ることもできる（detach操作）。detach操作がなされたスレッドは、それ以後は他スレッドから直接関与することが出来なくなる。またdetach操作が終わった`thread`オブジェクトは、何も指さない空の`thread`オブジェクトとなる。

`thread`オブジェクトを破棄するデストラクタでは、その`thread`オブジェクトが何も指していないことが要件となっている。言い換えると、新しいスレッドを作成した`thread`オブジェクトでは、破棄される前にjoin操作またはdetach操作のいずれか一方が必ず行われなければならない。この要件に反した場合、`thread`オブジェクトのデストラクタは[`std::terminate()`](/reference/exception/terminate.md)関数を呼び出してプ�グラム終了する。

## メンバ関数

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|--------------------------------------------------------------------|-------|
| [`(constructor)`](thread/op_constructor.md)        | コンストラクタ | C++11 |
| [`(destructor)`](thread/op_destructor.md)        | デストラクタ | C++11 |
| [`operator=`](thread/op_assign.md)         | 代入演算� | C++11 |
| [`swap`](thread/swap.md)                   | 別の`thread`と交換する | C++11 |
| [`joinable`](thread/joinable.md)           | スレッドに関連付けられているか否かを取得する | C++11 |
| [`join`](thread/join.md)                   | スレッドが終了するまで待機する | C++11 |
| [`detach`](thread/detach.md)               | スレッドの管理を手放す | C++11 |
| [`get_id`](thread/get_id.md)               | 関連付けられているスレッドのスレッド�別�を取得する | C++11 |
| [`native_handle`](thread/native_handle.md) | スレッドに関連付けられたネイティブハンドルを取得する［処理系定義］ | C++11 |


## 静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------------------------------------------------------------|----------------------------------------------------|-------|
| [`hardware_concurrency`](thread/hardware_concurrency.md) | 処理系によりサポートされるスレッド並行数を取得する | C++11 |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|------------------------|----------------------------------------------|-------|
| [`id`](thread/id.md) | スレッド�別� (class) | C++11 |
| `native_handle_type`   | ネイティブハンドル型 (type-alias)［処理系定義］ | C++11 |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------|---------------------------------------|-------|
| [`swap`](thread/swap_free.md) | 2つの`thread`オブジェクトを入れ替える | C++11 |


## 備考
型`native_handle_type`およびメンバ関数`native_handle`について、同メンバの�在有無およびその意味は処理系定義となる。


## 例
```cpp example
#include <cassert>
#include <thread>

int main()
{
  int x = 0, y = 0;

  std::thread t([&]{ ++x; });
  --y;
  t.join();

  assert(x == 1 && y == -1);
  return 0;
}
```

### 出力
```
```

## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013, 2015
	- 2012はメモリリークするバグあり [link](http://stackoverflow.com/questions/14238670/is-this-a-big-bug-of-microsofts-implementation-of-stdthread)

## 参照


