#デストラクタ (C++11)
```cpp
~shared_future();
```

##概要
`shared_future`オブジェクトの破棄


##効果
共有状態を解放し、`*this`を破棄する。


##備考
[`async()`](../async.md)関数を[`launch::async`](../launch.md)ポリシーで実行した結果の`future`オブジェクトの場合のみ、そのデストラクタは非同期タスクの実行を待機(`join`)する。


##例
```cpp
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): ??
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.0
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): 11.0


##参照

[async関数launch::asyncポリシーとfutureのちょっと特殊な動作 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120317/p1)
[async関数launch::asyncポリシーとfutureのちょっと特殊な動作（続き） - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20121004/p1)

