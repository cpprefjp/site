# acquire
* semaphore[meta header]
* std[meta namespace]
* counting_semaphore[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void acquire();
```

## 概要
カウンティングセマフォのカウンタ値が`0`より大きくなるまで待機し、カウンタ値を`1`だけ減算してから制御を戻す。

説明のため、ここではカウンタ値を`counter`と表記する。


## 効果
次のステップを繰り返す：

- [`try_acquire`](try_acquire.md)を評価し、結果が`true`ならば関数呼び出し元へ制御を戻す。
- `counter`が`0`より大きくなるまで、`*this`上で関数呼び出しスレッドをブロッキングする。


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](/reference/system_error/errc.md) : 操作対象のネイティブハンドル型が無効
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない


## 備考
「効果」欄では`acquire`メンバ関数の振る舞いを手続き的に説明しているが、実際の処理系においてはオペレーティングシステムが提供する効率的なセマフォ操作関数が利用されると期待される。

- POSIXセマフォでは[`sem_wait`関数](https://web.archive.org/web/20230206231852/http://linuxjm.osdn.jp/html/LDP_man-pages/man3/sem_wait.3.html)が提供される。
- Windowsセマフォでは[`WaitForSingleObject`関数](https://docs.microsoft.com/en-us/windows/win32/api/synchapi/nf-synchapi-waitforsingleobject)ファミリが提供される。


## 例
```cpp example
#include <iostream>
#include <semaphore>
#include <thread>

int main()
{
  int shared_data = 0;
  std::counting_semaphore sem{0};

  std::thread t([&]{
    // 通知を待機し、共有データから読取り
    sem.acquire();
    std::cout << shared_data << std::endl;
  });

  // 共有データへ書込み、通知を行う
  shared_data = 42;
  sem.release();

  t.join();
}
```
* acquire()[color ff0000]
* release()[link release.md]

### 出力
```
42
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 11.0
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
