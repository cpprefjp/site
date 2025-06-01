# forward_progress_guarantee
* execution[meta header]
* std::execution[meta namespace]
* enum[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  enum class forward_progress_guarantee {
    concurrent,
    parallel,
    weakly_parallel
  };
}
```

## 概要
[Scheduler](scheduler.md)に関連付けられた実行リソースに属する実行エージェントの、前方進行保証(forward progress guarantees)レベルを表現する列挙型。

| 列挙子 | 前方進行保証レベル |
|----|----|
| `concurrent` | 全ての実行エージェントが並行前方進行保証(concurrent forward progress guarantees)を提供する |
| `parallel` | 全ての実行エージェントが少なくとも並列前方進行保証(parallel forward progress guarantees)を提供する |
| `weakly_parallel` | 弱い並列前方進行保証(weakly parallel forward progress guarantees)となる |

`concurrent`が最も強い前方進行保証を与え、`parallel`、`weakly_parallel`の順に前方進行保証が弱くなる。


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::get_forward_progress_guarantee`](get_forward_progress_guarantee.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
