# execution
* execution[meta header]
* std[meta namespace]
* namespace[meta id-type]
* cpp17[meta cpp]

名前空間 `std::execution` では、アルゴリズムの並列実行を許可するための実行ポリシーに関する機能の定義を行う。

```cpp
namespace std::execution {
  …
}
```


| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`sequenced_policy`](execution/execution_policy.md) | 逐次処理の実行ポリシー型 (class) | C++17 |
| [`parallel_policy`](execution/execution_policy.md) | マルチスレッド化の実行ポリシー型 (class) | C++17 |
| [`parallel_unsequenced_policy`](execution/execution_policy.md) | マルチスレッド化／ベクトル化の実行ポリシー型 (class) | C++17 |
| [`unsequenced_policy`](execution/execution_policy.md) | ベクトル化の実行ポリシー型 (class) | C++20 |
| [`seq`](execution/execution_policy.md) | 逐次処理の実行ポリシー値 (variable) | C++17 |
| [`par`](execution/execution_policy.md) | マルチスレッド化の実行ポリシー値 (variable) | C++17 |
| [`par_unseq`](execution/execution_policy.md) | マルチスレッド化／ベクトル化の実行ポリシー値 (variable) | C++17 |
| [`unseq`](execution/execution_policy.md) | ベクトル化の実行ポリシー値 (variable) | C++20 |


## バージョン
### 言語
- C++17
