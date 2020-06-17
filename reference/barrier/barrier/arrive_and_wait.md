# arrive_and_wait
* barrier[meta header]
* std[meta namespace]
* barrier[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
void arrive_and_wait();
```

## 概要
バリアのフェーズ同期ポイント上での待ち合わせ（到達通知と待機処理）を行う。
設定されていれば、次フェーズへの移行前に完了関数を呼び出す。


## 効果
[`wait`](wait.md)`(`[`arrive()`](arrive.md)`)` と等価。


## 戻り値
なし


## 例外
この関数は、以下のerror conditionを持つ[`system_error`](/reference/system_error/system_error.md)例外オブジェクトを送出する可能性がある：

- [`resource_unavailable_try_again`](/reference/system_error/errc.md) : 操作対象のネイティブハンドル型が無効
- [`operation_not_permitted`](/reference/system_error/errc.md) : スレッドにこの操作を行う権限がない


## 例
```cpp example
```
* arrive_and_wait[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 11.0
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`arrive()`](arrive.md)
- [`wait()`](wait.md)
- [`arrive_and_drop()`](arrive_and_drop.md)
