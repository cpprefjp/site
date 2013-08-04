#future(C++11)
```cpp
namespace std {
  template <class R>
  class future;
}
```

##概要
`future`は、「別スレッドでの処理完了を待ち、その処理結果を取得する」といった非同期処理を実現するためのクラスであり、[`promise`](./promise.md)クラスと組み合わせて使用する。[`promise`](./promise.md)が別スレッドでの処理結果を書き込み、`future`がその結果を読み取る。[`promise`](./promise.md)と`future`は内部的に同一の共有状態を参照する。これによってスレッド間での値の受け渡しやスレッド間同期を実現する。このクラスは`R&`および`void`の、2つの特殊化を持つ。

###メンバ関数

| 名前 | 説明 | 対応バージョン |
|---------------------------------------|--------------------------------|-------|
| [`(constructor)`](./future/future.md) | コンストラクタ                 | C++11 |
| [`(destructor)`](./future/-future.md) | デストラクタ                   | C++11 |
| [`operator=`](./future/op_assign.md)  | 代入演算子                     | C++11 |
| [`share`](./future/share.md)          | `future`オブジェクトを共有する | C++11 |


####値の取得

| 名前 | 説明 | 対応バージョン |
|--------------------------|----------------|-------|
| [`get`](./future/get.md) | 結果を取得する | C++11 |


####関数の状態を確認する

| 名前 | 説明 | 対応バージョン |
|------------------------------|----------------------------------|-------|
| [`valid`](./future/valid.md) | 共有状態を持っているかを確認する | C++11 |


####待機

| 名前 | 説明 | 対応バージョン |
|----------------------------------------|----------------------------------|-------|
| [`wait`](./future/wait.md)             | 処理が完了するまで待機する | C++11 |
| [`wait_for`](./future/wait_for.md)     | 相対時間でタイムアウトを指定して、処理が完了するまで待機する | C++11 |
| [`wait_until`](./future/wait_until.md) | 絶対時間でタイムアウトを指定して、処理が完了するまで待機する | C++11 |


##例
```cpp
#include <iostream>
#include <future>
#include <thread>
#include <utility>

void calc(std::promise<int> p)
{
  int sum = 0;
  for (int i = 0; i < 10; ++i) {
    sum += i + 1;
  }

  p.set_value(sum); // 結果値を書き込む
}

int main()
{
  std::promise<int> p;
  std::future<int> f = p.get_future();

  // 別スレッドで計算を行う
  std::thread t(calc, std::move(p));

  // calc()によって書き込まれた結果を取得
  std::cout << f.get() << std::endl;

  t.join();
}
```

###出力
```
55
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0

###備考
※ VC++11.0段階の`std::thread`クラスは、コンストラクタに引数をムーブで渡すことができない。そのため、`promise`オブジェクトはスレッド間の共有オブジェクトにする必要がある。(所有権が曖昧になるため、スタイルとしてはよくない)  
[#737812 - std::thread does not accept std::move](http://connect.microsoft.com/VisualStudio/feedback/details/737812)


###参照

