#デストラクタ
```cpp
~shared_future();
```

##概要

<b>shared_futureオブジェクトの破棄</b>


##効果

共有状態を解放し、*thisを破棄する。


##備考
[`async()`](/reference/future/async.md)関数を[`launch::async`](/reference/future/launch.md)ポリシーで実行した結果の`future`オブジェクトの場合のみ、そのデストラクタは非同期タスクの実行を待機(`join`)する。


##例

```cpp
```

###出力

```cpp
##バージョン
```

###言語


- C++11



###処理系

- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md) ??



##参照

[async関数launch::asyncポリシーとfutureのちょっと特殊な動作 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120317/p1)

[async関数launch::asyncポリシーとfutureのちょっと特殊な動作（続き） - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20121004/p1)

